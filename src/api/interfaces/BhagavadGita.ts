export interface APIChapter {
	chapter_number: number,
	verses_count: number,
	name: string,
	translation: string,
	transliteration: string,
	meaning: {
		en: string,
		hi: string
	}
	summary: {
		en: string,
		hi: string
	}
}

export interface APISloka {
	chapter: number,
	verse: number,
	slok: string,
	transliteration: string,
	siva: {
		et: string
	},
	purohit: {
		et: string
	},
	san: {
		et: string
	},
	adi: {
		et: string
	},
	gambir: {
		et: string
	},
	raman: {
		et: string
	},
	sankar: {
		et: string
	},
}
