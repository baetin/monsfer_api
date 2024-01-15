const { createConnection, EntitySchema, getRepository } = require('typeorm');

// Artwork 엔터티 모델 정의
class Artwork {
  constructor(id, image_path) {
    this.id = id;
    this.image_path = image_path;
  }
}

// Artwork 엔터티 스키마 정의
const ArtworkSchema = new EntitySchema({
  name: 'Artwork',
  target: Artwork,
  columns: {
    artwork_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    image_path: {
      type: 'varchar',
    },
  },
});

// BgColor 엔터티 모델 정의
class BgColor {
  constructor(bgcolor_id, bgcolor_name, hexcode_id) {
    this.bgcolor_id = bgcolor_id;
    this.bgcolor_name = bgcolor_name;
    this.hexcode_id = hexcode_id;
  }
}

// BgColor 엔터티 스키마 정의
const BgColorSchema = new EntitySchema({
  name: 'BgColor',
  target: BgColor,
  tableName: 'bgcolor',
  columns: {
    bgcolor_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    bgcolor_name: {
      type: 'varchar',
    },
    hexcode_id: {
      type: 'int',
    },
  },
});

// CustomCase 엔터티 모델 정의
class CustomCase {
  constructor(custom_case_id, artwork_id, date, normal_case_id, font_id, hexcode_id) {
    this.custom_case_id = custom_case_id;
    this.artwork_id = artwork_id;
    this.date = date;
    this.normal_case_id = normal_case_id;
    this.font_id = font_id;
    this.hexcode_id = hexcode_id;
  }
}

// CustomCase 엔터티 스키마 정의
const CustomCaseSchema = new EntitySchema({
  name: 'CustomCase',
  target: CustomCase,
  columns: {
    custom_case_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    artwork_id: {
      type: 'int',
    },
    date: {
      type: 'varchar',
    },
    normal_case_id: {
      type: 'int',
    },
    font_id: {
      type: 'int',
    },
    hexcode_id: {
      type: 'int',
    },
  },
});

// FontColor 엔터티 모델 정의
class FontColor {
  constructor(id, name, hexCode) {
    this.id = id;
    this.name = name;
    this.hexCode = hexCode;
  }
}

const FontColorSchema = new EntitySchema({
  name: 'Fontcolor',
  target: FontColor,
  tableName: 'fontcolor',  // tableName으로 수정
  columns: {
    fontcolor_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    font_id: {
      type: 'int',
    },
    hexcode_id: {
      type: 'int',
    },
  },
});


class Font {
  constructor(id, font_name, hexcode_id, font_file_path) {
    this.id = id;
    this.font_name = font_name;
    this.hexcode_id = hexcode_id;
    this.font_file_path = font_file_path;
  }
}

const FontSchema = new EntitySchema({
  name: 'Font',
  target: Font,
  columns: {
    font_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    font_name: {
      type: 'varchar',
    },
    hexcode_id: {
      type: 'int',
    },
    font_file_path: {
      type: 'varchar',
    },
  },
});

// TypeORM 연결 설정
const initializeDatabase = async () => {
  try {
    await createConnection({
      type: 'mysql', // 사용하는 데이터베이스에 맞게 설정
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ArtworkSchema, BgColorSchema, CustomCaseSchema, FontColorSchema, FontSchema],
      synchronize: true,
      logging: true,
    });

    console.log('데이터베이스에 연결되었습니다');
  } catch (error) {
    console.error('데이터베이스 연결 중 오류 발생:', error.message);
    throw error;
  }
};

// BgColor 조회
const getAllBgColors = async () => {
  try {
    const bgColorRepository = getRepository(BgColor);
    return bgColorRepository.find();
  } catch (error) {
    console.error('모든 배경 색상을 가져오는 중 오류 발생:', error.message);
    throw error;
  }
};

// BgColor 추가
const addNewBgColor = async (bgcolor_name, hexcode_id) => {
  try {
    const bgColorRepository = getRepository(BgColor);
    const newBgColor = new BgColor(null, bgcolor_name, hexcode_id);
    return bgColorRepository.save(newBgColor);
  } catch (error) {
    console.error('새로운 배경 색상을 추가하는 중 오류 발생:', error.message);
    throw error;
  }
};

// BgColor 업데이트
const updateBgColor = async (id, bgcolor_name, hexcode_id) => {
  try {
    const bgColorRepository = getRepository(BgColor);
    const existingBgColor = await bgColorRepository.findOne(id);

    if (!existingBgColor) {
      return null; // 업데이트할 배경 색상이 없을 경우 null 반환
    }

    existingBgColor.bgColorName = bgcolor_name; 
    existingBgColor.hexCode = hexcode_id; 

    return bgColorRepository.save(existingBgColor);
  } catch (error) {
    console.error('배경 색상을 업데이트하는 중 오류 발생:', error.message);
    throw error;
  }
};

// BgColor 삭제 함수
const deleteBgColor = async (id) => {
  try {
    const bgColorRepository = getRepository(BgColor);
    const existingBgColor = await bgColorRepository.findOne(id);

    if (!existingBgColor) {
      return null; // 삭제할 배경 색상이 없을 경우 null 반환
    }

    return bgColorRepository.remove(existingBgColor);
  } catch (error) {
    console.error('배경 색상을 삭제하는 중 오류 발생:', error.message);
    throw error;
  }
};


// CustomCase 조회 함수
const getAllCustomCases = async () => {
  try {
    const customCaseRepository = getRepository(CustomCase);
    return customCaseRepository.find();
  } catch (error) {
    console.error('모든 사용자 지정 케이스를 가져오는 중 오류 발생:', error.message);
    throw error;
  }
};

// CustomCase 추가 함수
const addNewCustomCase = async (artworkId, date, normalCaseId, fontId, hexcodeId) => {
  try {
    const customCaseRepository = getRepository(CustomCase);
    const newCustomCase = new CustomCase(null, artworkId, date, normalCaseId, fontId, hexcodeId);
    return customCaseRepository.save(newCustomCase);
  } catch (error) {
    console.error('새로운 사용자 지정 케이스를 추가하는 중 오류 발생:', error.message);
    throw error;
  }
};

// CustomCase 삭제 함수
const deleteCustomCase = async (id) => {
  try {
    const customCaseRepository = getRepository(CustomCase);
    const result = await customCaseRepository.delete(id);
    return result.affected > 0;
  } catch (error) {
    console.error('사용자 지정 케이스를 삭제하는 중 오류 발생:', error.message);
    throw error;
  }
};

// CustomCase 전체 삭제 함수
const deleteAllCustomCases = async () => {
  try {
    const customCaseRepository = getRepository(CustomCase);
    const allCustomCases = await customCaseRepository.find();

    if (!allCustomCases || allCustomCases.length === 0) {
      return false; // 삭제할 custom_case가 없을 경우 false 반환
    }

    await customCaseRepository.remove(allCustomCases);
    return true; // 삭제 성공
  } catch (error) {
    console.error('모든 custom_case를 삭제하는 중 오류 발생:', error.message);
    throw error;
  }
};

// FontColor 조회 함수 추가
const getAllFontColors = async () => {
  try {
    const fontColorRepository = getRepository(FontColor);
    return fontColorRepository.find();
  } catch (error) {
    console.error('모든 폰트 색상을 가져오는 중 오류 발생:', error.message);
    throw error;
  }
};

// FontColor 추가 함수
const addNewFontColor = async (name, hexCode) => {
  try {
    const fontColorRepository = getRepository(FontColor);
    const newFontColor = new FontColor(null, name, hexCode);
    return fontColorRepository.save(newFontColor);
  } catch (error) {
    console.error('새로운 폰트 색상을 추가하는 중 오류 발생:', error.message);
    throw error;
  }
};

// FontColor 업데이트 함수
const updateFontColor = async (id, name, hexCode) => {
  try {
    const fontColorRepository = getRepository(FontColor);
    const existingFontColor = await fontColorRepository.findOne(id);

    if (!existingFontColor) {
      return null; // 업데이트할 폰트 색상이 없을 경우 null 반환
    }

    existingFontColor.name = name;
    existingFontColor.hexCode = hexCode;

    return fontColorRepository.save(existingFontColor);
  } catch (error) {
    console.error('폰트 색상을 업데이트하는 중 오류 발생:', error.message);
    throw error;
  }
};

// FontColor 삭제 함수
const deleteFontColor = async (id) => {
  try {
    const fontColorRepository = getRepository(FontColor);
    const existingFontColor = await fontColorRepository.findOne(id);

    if (!existingFontColor) {
      return null; // 삭제할 폰트 색상이 없을 경우 null 반환
    }

    return fontColorRepository.remove(existingFontColor);
  } catch (error) {
    console.error('폰트 색상을 삭제하는 중 오류 발생:', error.message);
    throw error;
  }
};

// Font 조회 함수 추가
const getAllFonts = async () => {
  try {
    const fontRepository = getRepository(Font);
    return fontRepository.find();
  } catch (error) {
    console.error('모든 폰트를 가져오는 중 오류 발생:', error.message);
    throw error;
  }
};

// Font 추가 함수
const addNewFont = async (fontName, hexcodeId, fontFilePath) => {
  try {
    const fontRepository = getRepository(Font);
    const newFont = new Font(null, fontName, hexcodeId, fontFilePath);
    return fontRepository.save(newFont);
  } catch (error) {
    console.error('새로운 폰트를 추가하는 중 오류 발생:', error.message);
    throw error;
  }
};

// Font 삭제 함수
const deleteFont = async (id) => {
  try {
    const fontRepository = getRepository(Font);
    const existingFont = await fontRepository.findOne(id);

    if (!existingFont) {
      return null;
    }

    return fontRepository.remove(existingFont);
  } catch (error) {
    console.error('폰트를 삭제하는 중 오류 발생:', error.message);
    throw error;
  }
};

module.exports = {
  Artwork,
  BgColor,
  CustomCase,
  initializeDatabase,
  getAllBgColors,
  addNewBgColor,
  updateBgColor,
  deleteBgColor,
  getAllCustomCases,
  addNewCustomCase,
  deleteCustomCase,
  deleteAllCustomCases,
  getAllFonts,
  addNewFont,
  deleteFont,
  getAllFontColors,
  addNewFontColor,
  updateFontColor,
  deleteFontColor,
};
