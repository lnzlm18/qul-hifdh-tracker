# QUL Hifdh Tracker

Quran memorisation progress tracker using Mushaf metadata from **Tarteel's [Quranic Universal Library (QUL)](https://qul.tarteel.ai)**.

## QUL Resources Used
| Resource | QUL Category |
|---|---|
| Surah names (Arabic + transliteration) | Quran metadata |
| Ayah counts per surah | Quran metadata |
| Juz numbers | Quran metadata |
| Mushaf page counts | Mushaf layouts |

## Features
- Track memorisation status per surah: Not Started / In Progress / Memorised / Reviewing
- Ayah-level slider for In Progress surahs — record exactly how many ayahs you have done
- Progress bar per surah — visual fill based on ayah completion
- Overall weighted progress bar — weighted by ayah count, not just surah count
- Your notes field per surah with Save button and unsaved changes warning
- Teacher feedback field — separate from your own notes
- Last revised date — automatically recorded when you update a status
- Search by surah name (English or Arabic) or number
- Filter by status — show only In Progress, Memorised, etc.
- Juz filter dropdown — focus on a specific juz
- By Juz view — see surahs grouped by juz with per-juz progress bars
- Juz 30 dashboard stat
- All progress saved to localStorage — no backend or account needed

## Getting Started
```bash
npm install
npm run dev
```

Open your browser at `http://localhost:5173`

## Extending This App

Ideas for building on top of this with more QUL data:

- Add **audio playback** for revision using QUL's recitation dataset
- Add **daily revision scheduling** using spaced repetition
- Show **Mushaf page view** using QUL's Mushaf layout data
- Add **word-by-word testing** using QUL's morphology dataset

## About QUL

→ [QUL Resources](https://qul.tarteel.ai/resources)  
→ [QUL GitHub](https://github.com/TarteelAI/quranic-universal-library)