const { createConnection, EntitySchema, getRepository } = require('typeorm');

// Artwork 엔터티 모델 정의
class Artwork {
  constructor(artwork_id, artwork_image_path) {
    this.artwork_id = artwork_id;
    this.artwork_image_path = artwork_image_path;
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
    artwork_image_path: {
      type: 'varchar',
    },
  },
});

// BgColor 엔터티 모델 정의
class BgColor {
  constructor(bgcolor_id, bgcolor_name, hexcode_id) {
    this.bgcolor_id = bgcolor_id;
    this.bgcolor_name = bgcolor_name;
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
    }
  },
});

// Order 엔터티 모델 정의
class Order {
  constructor(order_custom_case_id, order_product_folder_name, order_goods_name, order_date, order_check1, order_check2, order_download) {
    this.order_custom_case_id = order_custom_case_id;
    this.order_product_folder_name = order_product_folder_name;
    this.order_goods_name = order_goods_name;
    this.order_date = order_date;
    this.order_check1 = order_check1;
    this.order_check2 = order_check2;
    this.order_download = order_download;
  }
}

// Order(케이스 조회) 엔터티 스키마 정의
const OrderSchema = new EntitySchema({
  name: 'Order',
  target: Order,
  tableName: 'order',
  columns: {
    order_custom_case_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    order_product_folder_name: {
      type: 'varchar',
    },
    order_goods_name: {
      type: 'varchar',
    },
    order_date: {
      type: 'date',
    },
    order_check1: {
      type: 'varchar',
    },
    order_check2: {
      type: 'varchar',
    },
    order_download: {
      type: 'varchar',
    },
  },
});

// FontColor 엔터티 모델 정의
class FontColor {
  constructor(fontcolor_id, fontcolor_name) {
    this.fontcolor_id = fontcolor_id;
    this.fontcolor_name = fontcolor_name;
  }
}

// FontColor 엔터티 스키마 정의
const FontColorSchema = new EntitySchema({
  name: 'FontColor',
  target: FontColor,
  tableName: 'fontcolor',
  columns: {
    fontcolor_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    fontcolor_name: {
      type: 'varchar',
    },
  },
});

class Font {
  constructor(id, font_name, font_file_path) {
    this.id = id;
    this.font_name = font_name;
    this.font_file_path = font_file_path;
  }
}

const FontSchema = new EntitySchema({
  name: 'Font',
  target: Font,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    font_name: {
      type: 'varchar',
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
      type: 'mysql', 
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ArtworkSchema, BgColorSchema, OrderSchema, FontColorSchema, FontSchema],
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
const addNewBgColor = async (bgcolor_name) => {
  try {
    const bgColorRepository = getRepository(BgColor);
    const newBgColor = new BgColor(null, bgcolor_name);
    return bgColorRepository.save(newBgColor);
  } catch (error) {
    console.error('새로운 배경 색상을 추가하는 중 오류 발생:', error.message);
    throw error;
  }
};

// BgColor 업데이트
const updateBgColor = async (id, bgcolor_name) => {
  try {
    const bgColorRepository = getRepository(BgColor);
    const existingBgColor = await bgColorRepository.findOne(id);

    if (!existingBgColor) {
      return null; 
    }

    existingBgColor.bgColorName = bgcolor_name; 

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
      return null; 
    }

    return bgColorRepository.remove(existingBgColor);
  } catch (error) {
    console.error('배경 색상을 삭제하는 중 오류 발생:', error.message);
    throw error;
  }
};

// Order 조회 함수
const getAllOrders = async () => {
  try {
    const orderRepository = getRepository(Order);
    return orderRepository.find();
  } catch (error) {
    console.error('모든 주문을 가져오는 중 오류 발생:', error.message);
    throw error;
  }
};

// Order 추가 함수
const addNewOrder = async (order_product_folder_name, order_goods_name, order_date, order_check1, order_check2, order_download) => {
  try {
    const orderRepository = getRepository(Order);
    const newOrder = new Order(null, order_product_folder_name, order_goods_name, order_date, order_check1, order_check2, order_download);
    return orderRepository.save(newOrder);
  } catch (error) {
    console.error('새로운 주문을 추가하는 중 오류 발생:', error.message);
    throw error;
  }
};

// Order 삭제 함수
const deleteOrder = async (id) => {
  try {
    const orderRepository = getRepository(Order);
    const result = await orderRepository.delete(id);
    return result.affected > 0;
  } catch (error) {
    console.error('주문을 삭제하는 중 오류 발생:', error.message);
    throw error;
  }
};

// Order 전체 삭제 함수
const deleteAllOrders = async () => {
  try {
    const orderRepository = getRepository(Order);
    const allOrders = await orderRepository.find();

    if (!allOrders || allOrders.length === 0) {
      return false;
    }

    await orderRepository.remove(allOrders);
    return true;
  } catch (error) {
    console.error('모든 주문을 삭제하는 중 오류 발생:', error.message);
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
const addNewFontColor = async (name) => {
  try {
    const fontColorRepository = getRepository(FontColor);
    const newFontColor = new FontColor(null, name);
    return fontColorRepository.save(newFontColor);
  } catch (error) {
    console.error('새로운 폰트 색상을 추가하는 중 오류 발생:', error.message);
    throw error;
  }
};

// FontColor 업데이트 함수
const updateFontColor = async (id, name) => {
  try {
    const fontColorRepository = getRepository(FontColor);
    const existingFontColor = await fontColorRepository.findOne(id);

    if (!existingFontColor) {
      return null; 
    }

    existingFontColor.name = name;

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
      return null; 
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
const addNewFont = async (font_name, fontFilePath) => {
  try {
    const fontRepository = getRepository(Font);
    const newFont = new Font(null, font_name, fontFilePath);
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
  Order,
  initializeDatabase,
  getAllBgColors,
  addNewBgColor,
  updateBgColor,
  deleteBgColor,
  getAllOrders,
  addNewOrder,
  deleteOrder,
  deleteAllOrders,
  getAllFonts,
  addNewFont,
  deleteFont,
  getAllFontColors,
  addNewFontColor,
  updateFontColor,
  deleteFontColor,
};
