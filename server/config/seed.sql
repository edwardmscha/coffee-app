-- 기존 데이터 삭제 (주의: 실제 운영 환경에서는 사용하지 마세요)
TRUNCATE TABLE order_item_options, order_items, orders, options, menus RESTART IDENTITY CASCADE;

-- 메뉴 데이터 삽입
INSERT INTO menus (name, description, price, image_url, stock) VALUES
('아메리카노(ICE)', '시원하고 깔끔한 아이스 아메리카노', 4000, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop', 10),
('아메리카노(HOT)', '따뜻하고 진한 핫 아메리카노', 4000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop', 10),
('카페라떼', '부드러운 우유와 에스프레소의 조화', 5000, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', 10),
('카푸치노', '거품이 풍부한 카푸치노', 5500, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop', 10),
('카라멜 마끼아또', '달콤한 카라멜 시럽이 들어간 마끼아또', 6000, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop&auto=format', 10),
('바닐라라떼', '향긋한 바닐라와 우유의 조화', 5500, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format', 10);

-- 옵션 데이터 삽입
-- 아메리카노(ICE) 옵션
INSERT INTO options (menu_id, name, additional_price) VALUES
(1, '샷 추가', 500),
(1, '시럽 추가', 0);

-- 아메리카노(HOT) 옵션
INSERT INTO options (menu_id, name, additional_price) VALUES
(2, '샷 추가', 500),
(2, '시럽 추가', 0);

-- 카페라떼 옵션
INSERT INTO options (menu_id, name, additional_price) VALUES
(3, '샷 추가', 500),
(3, '시럽 추가', 0),
(3, '휘핑크림', 500);

-- 카푸치노 옵션
INSERT INTO options (menu_id, name, additional_price) VALUES
(4, '샷 추가', 500),
(4, '시나몬 가루', 0);

-- 카라멜 마끼아또 옵션
INSERT INTO options (menu_id, name, additional_price) VALUES
(5, '샷 추가', 500),
(5, '휘핑크림', 500);

-- 바닐라라떼 옵션
INSERT INTO options (menu_id, name, additional_price) VALUES
(6, '샷 추가', 500),
(6, '시럽 추가', 0);

