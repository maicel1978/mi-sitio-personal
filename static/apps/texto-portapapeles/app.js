(() => {
  'use strict';

  const STORAGE_KEY = 'texttool_v2_state';
  const HISTORY_LIMIT = 120;
  const $ = (id) => document.getElementById(id);

  const els = {
    editor: $('editor'),
    autoCopy: $('autoCopy'),
    saveLocal: $('saveLocal'),
    clearStorageBtn: $('clearStorageBtn'),
    report: $('report'),
    toastWrap: $('toastWrap'),
    statLines: $('statLines'),
    statWords: $('statWords'),
    statChars: $('statChars'),
    statDups: $('statDups'),
    saveState: $('saveState'),
    undoBtn: $('undoBtn'),
    redoBtn: $('redoBtn'),
    clearBtn: $('clearBtn'),
    copyBtn: $('copyBtn'),
    copyReportBtn: $('copyReportBtn'),
    downloadTxtBtn: $('downloadTxtBtn')
  };

  const state = {
    reportText: '',
    history: [],
    historyIndex: -1,
    inputTimer: null,
    saveTimer: null
  };

  const Utils = {
    normalizeNewlines(text) { return String(text ?? '').replace(/\r\n?/g, '\n'); },
    count(text, regex) { return (String(text ?? '').match(regex) || []).length; },
    addReport(reports, label, count, detail = '') {
      if (Number(count) > 0) reports.push({ label, count: Number(count), detail });
    },
    lineStats(text) {
      const lines = text.length ? text.split('\n') : [''];
      const seen = new Set();
      let dups = 0;
      for (const line of lines) {
        const key = line.trim();
        if (!key) continue;
        if (seen.has(key)) dups += 1;
        else seen.add(key);
      }
      return { lines: lines.length, dups };
    },
    isListLine(line) {
      return /^\s*(?:[-–—•*·▪▫◦‣]\s+|\d{1,3}[.)]\s+|[a-zA-ZáéíóúñÁÉÍÓÚÑ][.)]\s+|[ivxlcdmIVXLCDM]{1,8}[.)]\s+)/.test(line);
    },
    isHeadingLike(line) {
      const t = line.trim();
      if (!t || t.length > 90 || /[.!?;:]$/.test(t)) return false;
      if (/^(cap[ií]tulo|anexo|secci[oó]n|parte|tema|unidad)\b/i.test(t)) return true;
      if (/^\d+(?:\.\d+){0,4}\s+\S+/.test(t)) return true;
      const letters = t.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '');
      if (letters.length < 4) return false;
      const upper = letters.replace(/[a-záéíóúüñ]/g, '').length;
      return upper / letters.length > 0.78;
    },
    splitCells(line) {
      return line.trim().split(/\t+| {2,}/).map(c => c.trim()).filter(Boolean);
    },
    probableTableColumns(line) {
      if (!/\S(?:\t| {2,})\S/.test(line)) return 1;
      return Utils.splitCells(line).length;
    },
    isShortUiLine(line) {
      const t = line.trim();
      if (!t || t.length > 70) return false;
      const exact = /^(compartir|leer m[aá]s|aceptar|aceptar todo|rechazar|rechazar todo|suscr[ií]bete|iniciar sesi[oó]n|registrarse|men[uú]|cerrar|siguiente|anterior)$/i;
      const policy = /^(pol[ií]tica de privacidad|aviso legal|configurar cookies?|cookies?|preferencias de cookies?)$/i;
      const banner = /cookies?.*(aceptar|rechazar|configurar)|(?:aceptar|rechazar|configurar).*cookies?/i;
      return exact.test(t) || policy.test(t) || banner.test(t);
    }
  };

  const Cleaners = {
    baseNormalize(text) {
      const before = String(text ?? '');
      const out = Utils.normalizeNewlines(before).normalize('NFC');
      const reports = [];
      Utils.addReport(reports, 'Saltos de línea/Unicode normalizados', before !== out ? 1 : 0);
      return { text: out, reports };
    },

    invisible(text) {
      const reports = [];
      let out = Utils.normalizeNewlines(text).normalize('NFC');
      const nbsp = Utils.count(out, /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g);
      out = out.replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ');
      const zero = Utils.count(out, /[\u200B-\u200D\u2060\uFEFF]/g);
      out = out.replace(/[\u200B-\u200D\u2060\uFEFF]/g, '');
      const controls = Utils.count(out, /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g);
      out = out.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
      const variation = Utils.count(out, /[\uFE00-\uFE0F]/g);
      out = out.replace(/[\uFE00-\uFE0F]/g, '');
      Utils.addReport(reports, 'Espacios invisibles convertidos', nbsp);
      Utils.addReport(reports, 'Marcas de ancho cero eliminadas', zero);
      Utils.addReport(reports, 'Caracteres de control eliminados', controls);
      Utils.addReport(reports, 'Variaciones Unicode eliminadas', variation);
      return { text: out, reports };
    },

    trimSpaces(text) {
      const before = Utils.normalizeNewlines(text);
      let groups = 0;
      const out = before.split('\n').map(line => {
        const g = Utils.count(line, / {2,}/g);
        groups += g;
        return line.replace(/ {2,}/g, ' ').trim();
      }).join('\n').replace(/\n{3,}/g, '\n\n');
      const reports = [];
      Utils.addReport(reports, 'Grupos de espacios colapsados', groups);
      Utils.addReport(reports, 'Bloques vacíos excesivos reducidos', Utils.count(before, /\n{3,}/g));
      return { text: out, reports };
    },

    typography(text) {
      const reports = [];
      let out = Utils.normalizeNewlines(text);
      const ellipsis = Utils.count(out, /\.\.\./g);
      out = out.replace(/\.\.\./g, '…');
      const longDash = Utils.count(out, /\s--\s|\s[–—]\s/g);
      out = out.replace(/\s--\s/g, ' — ').replace(/\s[–—]\s/g, ' — ');
      const ranges = Utils.count(out, /(\d)\s*[–—]\s*(\d)/g);
      out = out.replace(/(\d)\s*[–—]\s*(\d)/g, '$1-$2');
      const quotes = Utils.count(out, /"([^"\n]{1,160})"/g);
      out = out.replace(/"([^"\n]{1,160})"/g, '“$1”');
      const punct = Utils.count(out, /\s+([,.;:!?])/g) + Utils.count(out, /([¿¡])\s+/g);
      out = out.replace(/\s+([,.;:!?])/g, '$1').replace(/([¿¡])\s+/g, '$1');
      Utils.addReport(reports, 'Puntos suspensivos normalizados', ellipsis);
      Utils.addReport(reports, 'Guiones de inciso normalizados', longDash);
      Utils.addReport(reports, 'Rangos numéricos normalizados', ranges);
      Utils.addReport(reports, 'Comillas rectas convertidas', quotes);
      Utils.addReport(reports, 'Espacios junto a signos corregidos', punct);
      return { text: out, reports };
    },

    repairHyphens(text) {
      const reports = [];
      let repaired = 0;
      const compounds = new Set(['social', 'político', 'politico', 'económico', 'economico', 'cultural', 'práctico', 'practico', 'administrativo', 'científico', 'cientifico', 'técnico', 'tecnico', 'jurídico', 'juridico', 'laboral', 'sanitario']);
      const out = Utils.normalizeNewlines(text).replace(/([\p{L}]{3,})[-‐‑‒–—]\s*\n\s*([\p{Ll}][\p{L}]{2,})/gu, (_, a, b) => {
        repaired += 1;
        const lowerB = b.toLocaleLowerCase('es-ES');
        if (compounds.has(lowerB) || /(?:ico|ica|ivo|iva|al)$/.test(a.toLocaleLowerCase('es-ES')) && /^(?:social|cultural|pol[ií]tico|econ[oó]mico|pr[aá]ctico)/i.test(b)) {
          return `${a}-${b}`;
        }
        return `${a}${b}`;
      });
      Utils.addReport(reports, 'Palabras cortadas por guion revisadas', repaired);
      return { text: out, reports };
    },

    pdf(text) {
      let out = Utils.normalizeNewlines(text);
      const reports = [];
      const hy = Cleaners.repairHyphens(out);
      out = hy.text;
      reports.push(...hy.reports);

      const lines = out.split('\n');
      const freq = new Map();
      for (const raw of lines) {
        const t = raw.trim();
        if (t.length >= 4 && t.length <= 90) freq.set(t, (freq.get(t) || 0) + 1);
      }
      const repeatedDetected = [...freq.values()].filter(n => n >= 3).length;

      let removedPages = 0;
      const filtered = [];
      for (let i = 0; i < lines.length; i += 1) {
        const t = lines[i].trim();
        const prevBlank = i === 0 || !lines[i - 1].trim();
        const nextBlank = i === lines.length - 1 || !lines[i + 1].trim();
        const pageNumber = /^(?:p[aá]g(?:ina)?\s*)?\d{1,4}$/i.test(t);
        if (pageNumber && prevBlank && nextBlank) {
          removedPages += 1;
          continue;
        }
        filtered.push(lines[i]);
      }

      const blocks = filtered.join('\n').split(/\n{2,}/);
      let joinedLines = 0;
      const rebuilt = blocks.map(block => {
        const bLines = block.split('\n').map(l => l.trim()).filter(Boolean);
        if (bLines.length <= 1) return bLines.join('\n');
        if (bLines.some(Utils.isListLine) || bLines.some(l => Utils.probableTableColumns(l) >= 2)) return bLines.join('\n');
        if (bLines.length <= 3 && bLines.every(Utils.isHeadingLike)) return bLines.join('\n');
        const avgLen = bLines.reduce((a, l) => a + l.length, 0) / bLines.length;
        const paragraphLike = avgLen >= 45 || bLines.filter(l => l.length >= 35 && !/[.!?;:]$/.test(l)).length >= Math.max(2, bLines.length - 1);
        if (!paragraphLike) return bLines.join('\n');
        joinedLines += Math.max(0, bLines.length - 1);
        return bLines.join(' ');
      });
      out = rebuilt.join('\n\n').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
      Utils.addReport(reports, 'Números de página aislados eliminados', removedPages);
      Utils.addReport(reports, 'Líneas de PDF unidas en párrafos', joinedLines);
      Utils.addReport(reports, 'Posibles encabezados repetidos detectados, no eliminados', repeatedDetected);
      return { text: out, reports };
    },

    ai(text) {
      const reports = [];
      let out = Utils.normalizeNewlines(text);
      const before = out;
      const introPatterns = [
        /^\s*(claro|por supuesto|desde luego)[,:]?\s+(aqu[ií] tienes|te dejo|esta es|he preparado).*\n+/i,
        /^\s*aqu[ií]\s+tienes\s+.*?:\s*\n+/i,
        /^\s*te\s+dejo\s+.*?:\s*\n+/i
      ];
      let intros = 0;
      for (const p of introPatterns) { if (p.test(out)) intros += 1; out = out.replace(p, ''); }
      const closing = Utils.count(out, /\n+\s*(espero que (?:te )?(?:sirva|sea útil)|si quieres,? puedo|si necesitas.*)$/gim);
      out = out.replace(/\n+\s*(espero que (?:te )?(?:sirva|sea útil)[.!]?|si quieres,? puedo.*|si necesitas.*)$/gim, '');
      const heads = Utils.count(out, /^\s{0,3}#{1,6}\s+/gm);
      out = out.replace(/^\s{0,3}#{1,6}\s+/gm, '');
      const bold = Utils.count(out, /\*\*([^*\n]+)\*\*/g);
      out = out.replace(/\*\*([^*\n]+)\*\*/g, '$1');
      const italic = Utils.count(out, /(^|\s)\*([^*\n]{2,80})\*(?=\s|$|[.,;:!?])/g);
      out = out.replace(/(^|\s)\*([^*\n]{2,80})\*(?=\s|$|[.,;:!?])/g, '$1$2');
      const links = Utils.count(out, /\[([^\]\n]+)\]\(([^)\n]+)\)/g);
      out = out.replace(/\[([^\]\n]+)\]\(([^)\n]+)\)/g, '$1');
      const separators = Utils.count(out, /^\s*[-*_]{3,}\s*$/gm);
      out = out.replace(/^\s*[-*_]{3,}\s*$/gm, '');
      const list = Cleaners.lists(out); out = list.text.replace(/\n{3,}/g, '\n\n').trim();
      Utils.addReport(reports, 'Frases introductorias eliminadas', intros);
      Utils.addReport(reports, 'Frases finales típicas eliminadas', closing);
      Utils.addReport(reports, 'Encabezados Markdown limpiados', heads);
      Utils.addReport(reports, 'Negritas Markdown limpiadas', bold);
      Utils.addReport(reports, 'Cursivas Markdown limpiadas', italic);
      Utils.addReport(reports, 'Enlaces Markdown convertidos a texto', links);
      Utils.addReport(reports, 'Separadores Markdown eliminados', separators);
      reports.push(...list.reports);
      Utils.addReport(reports, 'Texto de IA procesado', before !== out ? 1 : 0);
      return { text: out, reports };
    },

    web(text) {
      const reports = [];
      let out = Utils.normalizeNewlines(text);
      const htmlEntities = Utils.count(out, /&(nbsp|amp|lt|gt|quot|apos);/gi);
      out = out.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&apos;/gi, "'");
      const urls = Utils.count(out, /https?:\/\/\S+/g);
      out = out.replace(/https?:\/\/\S+/g, '').replace(/[ \t]+\n/g, '\n');
      let uiRemoved = 0;
      out = out.split('\n').filter(line => {
        if (Utils.isShortUiLine(line)) { uiRemoved += 1; return false; }
        return true;
      }).join('\n');
      const inv = Cleaners.invisible(out); out = inv.text;
      const list = Cleaners.lists(out); out = list.text;
      out = out.replace(/\n{3,}/g, '\n\n').trim();
      Utils.addReport(reports, 'Entidades HTML decodificadas', htmlEntities);
      Utils.addReport(reports, 'URLs sueltas eliminadas', urls);
      Utils.addReport(reports, 'Líneas cortas de interfaz web eliminadas', uiRemoved);
      reports.push(...inv.reports, ...list.reports);
      return { text: out, reports };
    },

    lists(text) {
      const reports = [];
      let separated = 0;
      let out = Utils.normalizeNewlines(text).split('\n').map(line => {
        let current = line;
        const numericMarkers = current.match(/\b\d{1,3}[.)]\s+\S/g) || [];
        if (numericMarkers.length >= 2) {
          const before = current;
          current = current.replace(/([^\n])\s+(?=\d{1,3}[.)]\s+\S)/g, '$1\n');
          if (current !== before) separated += current.split('\n').length - before.split('\n').length;
        }
        const letterMarkers = current.match(/(?:^|\s)[a-zA-Z][)]\s+\S/g) || [];
        if (letterMarkers.length >= 2) {
          const before = current;
          current = current.replace(/([^\n])\s+(?=[a-zA-Z][)]\s+\S)/g, '$1\n');
          if (current !== before) separated += current.split('\n').length - before.split('\n').length;
        }
        return current;
      }).join('\n');
      const bulletVariants = Utils.count(out, /^\s*[•*·▪▫◦‣]\s+/gm);
      out = out.replace(/^\s*[•*·▪▫◦‣]\s+/gm, '- ').replace(/^\s*[–—]\s+/gm, '- ');
      const lines = out.split('\n');
      let joinedMarkers = 0;
      const fixed = [];
      for (let i = 0; i < lines.length; i += 1) {
        const cur = lines[i].trim();
        const next = (lines[i + 1] || '').trim();
        if (/^(?:\d{1,3}[.)]|[a-zA-Z][)]|[ivxlcdmIVXLCDM]{1,8}[.)]|[-])$/.test(cur) && next && !Utils.isHeadingLike(next)) {
          fixed.push(`${cur} ${next}`); joinedMarkers += 1; i += 1;
        } else fixed.push(lines[i]);
      }
      out = fixed.join('\n');
      Utils.addReport(reports, 'Listas en una línea separadas', separated);
      Utils.addReport(reports, 'Viñetas normalizadas', bulletVariants);
      Utils.addReport(reports, 'Marcadores de lista unidos con su texto', joinedMarkers);
      return { text: out, reports };
    },

    table(text, delimiter = '\t') {
      const reports = [];
      const lines = Utils.normalizeNewlines(text).split('\n');
      const colCounts = lines.map(line => Utils.probableTableColumns(line));
      const convertible = new Set();
      for (let i = 0; i < lines.length; i += 1) {
        const cols = colCounts[i];
        if (cols < 2) continue;
        const prevSame = i > 0 && colCounts[i - 1] === cols;
        const nextSame = i < lines.length - 1 && colCounts[i + 1] === cols;
        if (prevSame || nextSame) convertible.add(i);
      }
      let converted = 0;
      const out = lines.map((line, i) => {
        if (!line.trim()) return '';
        if (!convertible.has(i)) return line.trim();
        converted += 1;
        return Utils.splitCells(line).join(delimiter);
      }).join('\n');
      Utils.addReport(reports, delimiter === ',' ? 'Filas convertidas a CSV' : 'Filas convertidas a tabla tabulada', converted);
      if (!converted && text.trim()) Utils.addReport(reports, 'No se detectaron columnas consistentes', 1);
      return { text: out, reports };
    },

    csv(text) {
      const tab = Cleaners.table(text, '\t');
      const rows = tab.text.split('\n').filter(l => l.trim());
      const hasTabs = rows.some(r => r.includes('\t'));
      const out = rows.map(row => {
        const cells = hasTabs ? row.split('\t') : [row];
        return cells.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',');
      }).join('\n');
      const reports = [{ label: 'Filas exportadas a CSV', count: rows.length }];
      if (!hasTabs && rows.length) reports.push({ label: 'Aviso: no se detectaron columnas; se exportó una columna por línea', count: 1 });
      return { text: out, reports };
    },

    dedupe(text) {
      const reports = [];
      const lines = Utils.normalizeNewlines(text).split('\n');
      const seen = new Set(); let removed = 0;
      const out = [];
      for (const line of lines) {
        const key = line.trim();
        if (!key) { out.push(line); continue; }
        if (seen.has(key)) { removed += 1; continue; }
        seen.add(key); out.push(line);
      }
      Utils.addReport(reports, 'Líneas duplicadas eliminadas', removed);
      return { text: out.join('\n').replace(/\n{3,}/g, '\n\n'), reports };
    },

    renumber(text) {
      let n = 1, changed = 0;
      const out = Utils.normalizeNewlines(text).split('\n').map(line => {
        if (/^\s*\d{1,4}[.)]\s+/.test(line)) { changed += 1; return line.replace(/^\s*\d{1,4}([.)])\s+/, `${n++}$1 `); }
        return line;
      }).join('\n');
      return { text: out, reports: changed ? [{ label: 'Elementos numerados reajustados', count: changed }] : [] };
    },

    caseMode(text, mode) {
      let out = text;
      if (mode === 'upper') out = text.toLocaleUpperCase('es-ES');
      if (mode === 'lower') out = text.toLocaleLowerCase('es-ES');
      if (mode === 'sentence') out = text.toLocaleLowerCase('es-ES').replace(/(^|[.!?]\s+|\n+)([a-záéíóúüñ])/g, (_, p1, p2) => p1 + p2.toLocaleUpperCase('es-ES'));
      if (mode === 'title') {
        const small = new Set(['a','ante','bajo','con','contra','de','del','desde','en','entre','hacia','hasta','para','por','según','sin','sobre','tras','y','o','u','e','la','las','el','los','un','una','unos','unas']);
        out = Utils.normalizeNewlines(text).split('\n').map(line => {
          let first = true;
          return line.toLocaleLowerCase('es-ES').replace(/\b([\p{L}][\p{L}'’\-]*)/gu, (_, word) => {
            if (!first && small.has(word)) return word;
            first = false;
            return word.charAt(0).toLocaleUpperCase('es-ES') + word.slice(1);
          });
        }).join('\n');
      }
      return { text: out, reports: out !== text ? [{ label: 'Cambio de mayúsculas/minúsculas aplicado', count: 1 }] : [] };
    },

    accents(text) {
      const out = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC');
      return { text: out, reports: out !== text ? [{ label: 'Tildes y diacríticos removidos', count: 1 }] : [] };
    },

    prepare(text) {
      let out = text;
      const reports = [];
      // Preparar texto debe ser conservador: no borra líneas web ni encabezados repetidos.
      for (const step of [Cleaners.baseNormalize, Cleaners.invisible, Cleaners.repairHyphens, Cleaners.lists, Cleaners.trimSpaces]) {
        const r = step(out); out = r.text; reports.push(...r.reports);
      }
      return { text: out, reports };
    }
  };

  const Actions = {
    prepare: Cleaners.prepare,
    pdf: Cleaners.pdf,
    ai: Cleaners.ai,
    web: Cleaners.web,
    invisible: Cleaners.invisible,
    typography: Cleaners.typography,
    lists: Cleaners.lists,
    table: (t) => Cleaners.table(t, '\t'),
    tsv: (t) => Cleaners.table(t, '\t'),
    csv: Cleaners.csv,
    dedupe: Cleaners.dedupe,
    renumber: Cleaners.renumber,
    trim: Cleaners.trimSpaces,
    accents: Cleaners.accents,
    upper: (t) => Cleaners.caseMode(t, 'upper'),
    lower: (t) => Cleaners.caseMode(t, 'lower'),
    sentence: (t) => Cleaners.caseMode(t, 'sentence'),
    title: (t) => Cleaners.caseMode(t, 'title')
  };

  function pushHistory(text, reason = 'edit') {
    const current = Utils.normalizeNewlines(text);
    const last = state.history[state.historyIndex];
    if (last && last.text === current) return;
    if (state.historyIndex < state.history.length - 1) state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push({ text: current, reason, time: Date.now(), sel: [els.editor.selectionStart || 0, els.editor.selectionEnd || 0], scrollTop: els.editor.scrollTop || 0 });
    if (state.history.length > HISTORY_LIMIT) state.history.shift();
    state.historyIndex = state.history.length - 1;
    updateHistoryButtons();
  }

  function restoreHistory(entry) {
    setText(entry.text, { commit: false });
    requestAnimationFrame(() => {
      els.editor.selectionStart = entry.sel?.[0] ?? 0;
      els.editor.selectionEnd = entry.sel?.[1] ?? 0;
      els.editor.scrollTop = entry.scrollTop || 0;
    });
  }

  function updateHistoryButtons() {
    els.undoBtn.disabled = state.historyIndex <= 0;
    els.redoBtn.disabled = state.historyIndex >= state.history.length - 1;
    els.undoBtn.style.opacity = els.undoBtn.disabled ? '.45' : '1';
    els.redoBtn.style.opacity = els.redoBtn.disabled ? '.45' : '1';
  }

  function setText(text, { commit = false, reason = 'change' } = {}) {
    els.editor.value = Utils.normalizeNewlines(text);
    updateStats(); scheduleSave();
    if (commit) pushHistory(els.editor.value, reason);
  }

  function updateStats() {
    const text = els.editor.value;
    const st = Utils.lineStats(text);
    els.statLines.textContent = st.lines.toLocaleString('es');
    els.statWords.textContent = (text.trim() ? (text.match(/\S+/gu) || []).length : 0).toLocaleString('es');
    els.statChars.textContent = text.length.toLocaleString('es');
    els.statDups.textContent = st.dups.toLocaleString('es');
  }

  function labelForAction(action) {
    const labels = { prepare:'Preparar texto', pdf:'Limpiar PDF', ai:'Limpiar IA', web:'Limpiar web/HTML', invisible:'Quitar caracteres invisibles', typography:'Normalizar tipografía', lists:'Arreglar listas', table:'Texto a tabla', tsv:'Tabla tabulada', csv:'CSV', dedupe:'Eliminar duplicados', renumber:'Renumerar líneas', trim:'Colapsar espacios', accents:'Quitar tildes', upper:'MAYÚSCULAS', lower:'minúsculas', sentence:'Tipo oración', title:'Tipo Título' };
    return labels[action] || action;
  }

  function buildReport(actionName, before, after, reports) {
    const diff = after.length - before.length;
    const clean = (reports || []).filter(r => r && r.count > 0);
    const title = `Acción: ${labelForAction(actionName)}`;
    const summary = `Caracteres: ${before.length.toLocaleString('es')} → ${after.length.toLocaleString('es')} (${diff >= 0 ? '+' : ''}${diff.toLocaleString('es')})`;
    if (!clean.length && before === after) return `${title}\n${summary}\n\nNo se detectaron cambios necesarios.`;
    const bullets = clean.map(r => `- ${r.label}: ${Number(r.count).toLocaleString('es')}${r.detail ? ` (${r.detail})` : ''}`).join('\n');
    return `${title}\n${summary}\n\n${bullets || '- Se aplicó la transformación.'}`;
  }

  async function runAction(action) {
    const fn = Actions[action]; if (!fn) return;
    clearTimeout(state.inputTimer);
    const before = els.editor.value;
    pushHistory(before, `before-${action}`);
    try {
      const result = fn(before);
      const after = Utils.normalizeNewlines(result.text);
      setText(after, { commit: true, reason: action });
      setReport(buildReport(action, before, after, result.reports || []));
      let copied = false;
      if (els.autoCopy.checked) copied = await copyText(after, false);
      toast(`${labelForAction(action)} aplicado${els.autoCopy.checked ? (copied ? ' y copiado' : ' — no se pudo autocopiar') : ''}`, copied || !els.autoCopy.checked ? undefined : 'warn');
    } catch (err) { console.error(err); toast('Error procesando el texto', 'err'); }
  }

  function setReport(text) {
    state.reportText = text;
    els.report.classList.remove('empty');
    els.report.textContent = text;
    scheduleSave();
  }

  async function copyText(text, notify = true) {
    const value = String(text ?? '');
    try {
      await navigator.clipboard.writeText(value);
      if (notify) toast('Copiado al portapapeles');
      return true;
    } catch (_) {
      try {
        const temp = document.createElement('textarea');
        temp.value = value;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed'; temp.style.left = '-9999px'; temp.style.top = '0';
        document.body.appendChild(temp);
        temp.focus(); temp.select();
        const ok = document.execCommand && document.execCommand('copy');
        temp.remove();
        if (notify) toast(ok ? 'Copiado al portapapeles' : 'No se pudo copiar automáticamente', ok ? undefined : 'warn');
        return !!ok;
      } catch {
        if (notify) toast('No se pudo copiar automáticamente', 'warn');
        return false;
      }
    }
  }

  function downloadTxt() {
    const blob = new Blob([els.editor.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    a.href = url; a.download = `texttool-v2-${stamp}.txt`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    toast('TXT descargado');
  }

  function scheduleSave() {
    els.saveState.textContent = els.saveLocal.checked ? 'Guardando…' : 'Modo privado';
    clearTimeout(state.saveTimer); state.saveTimer = setTimeout(saveState, 250);
  }

  function saveState() {
    try {
      if (!els.saveLocal.checked) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ autoCopy: els.autoCopy.checked, saveLocal: false }));
        els.saveState.textContent = 'Modo privado'; return;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ text: els.editor.value, autoCopy: els.autoCopy.checked, saveLocal: true, report: state.reportText }));
      els.saveState.textContent = 'Guardado local';
    } catch (err) {
      els.saveState.textContent = err && err.name === 'QuotaExceededError' ? 'Texto demasiado grande para guardar' : 'No se pudo guardar';
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return;
      const data = JSON.parse(raw);
      if (typeof data.autoCopy === 'boolean') els.autoCopy.checked = data.autoCopy;
      if (typeof data.saveLocal === 'boolean') els.saveLocal.checked = data.saveLocal;
      if (els.saveLocal.checked && typeof data.text === 'string') setText(data.text);
      if (els.saveLocal.checked && typeof data.report === 'string' && data.report) setReport(data.report);
    } catch (_) {}
  }

  function clearLocalData() {
    localStorage.removeItem(STORAGE_KEY);
    state.reportText = '';
    els.report.classList.add('empty');
    els.report.textContent = 'Datos locales borrados. El texto actual no se eliminó del editor.';
    els.saveState.textContent = 'Datos locales borrados';
    toast('Datos locales borrados');
  }

  function toast(message, type) {
    const el = document.createElement('div');
    el.className = `toast${type ? ` ${type}` : ''}`;
    el.textContent = message;
    els.toastWrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 200); }, 2600);
  }

  function undo() {
    if (state.historyIndex > 0) { state.historyIndex -= 1; restoreHistory(state.history[state.historyIndex]); updateHistoryButtons(); toast('Deshecho'); }
  }

  function redo() {
    if (state.historyIndex < state.history.length - 1) { state.historyIndex += 1; restoreHistory(state.history[state.historyIndex]); updateHistoryButtons(); toast('Rehecho'); }
  }

  function initEvents() {
    document.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', () => runAction(btn.dataset.action)));
    els.editor.addEventListener('input', () => {
      updateStats(); scheduleSave(); clearTimeout(state.inputTimer);
      state.inputTimer = setTimeout(() => pushHistory(els.editor.value, 'typing'), 700);
    });
    els.editor.addEventListener('paste', () => setTimeout(() => { updateStats(); pushHistory(els.editor.value, 'paste'); scheduleSave(); }, 0));
    els.editor.addEventListener('keydown', e => {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && (key === 'y' || (key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
    });
    els.undoBtn.addEventListener('click', undo);
    els.redoBtn.addEventListener('click', redo);
    els.clearBtn.addEventListener('click', () => {
      if (!els.editor.value || confirm('¿Limpiar todo el texto?')) { setText('', { commit: true, reason: 'clear' }); setReport('Texto limpiado.'); toast('Texto limpiado'); }
    });
    els.copyBtn.addEventListener('click', () => copyText(els.editor.value));
    els.copyReportBtn.addEventListener('click', () => copyText(state.reportText || els.report.textContent));
    els.downloadTxtBtn.addEventListener('click', downloadTxt);
    els.autoCopy.addEventListener('change', scheduleSave);
    els.saveLocal.addEventListener('change', () => { if (!els.saveLocal.checked) localStorage.removeItem(STORAGE_KEY); scheduleSave(); });
    els.clearStorageBtn.addEventListener('click', clearLocalData);
  }

  function init() {
    loadState(); pushHistory(els.editor.value, 'initial'); updateStats(); updateHistoryButtons(); initEvents();
    window.TextToolEngine = { Cleaners, Utils };
  }

  init();
})();
