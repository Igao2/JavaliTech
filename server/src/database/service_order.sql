"CREATE TABLE IF NOT EXISTS `javaliTech`.`service_order` (
  `service_order_id` CHAR(6) NOT NULL,
  `user_id` INT NOT NULL,
  `senha` CHAR(6) NOT NULL,
  `owner_information` VARCHAR(255) NOT NULL,
  `owner_name` VARCHAR(150) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `device_name` VARCHAR(150) NULL,
  `delivery_date` DATETIME NOT NULL,
  `completion_date` DATETIME NULL,
  `status` INT NULL,
  `service_value` FLOAT NULL,
  PRIMARY KEY (`service_order_id`),
  UNIQUE INDEX `service_order_id_UNIQUE` (`service_order_id` ASC) VISIBLE,
  INDEX `fk_service_order_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_service_order_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `javaliTech`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO `service_order`(
	`service_order_id`,
	`user_id`,
	`senha`,
	`owner_information`,
	`owner_name`,
	`description`,
 	`device_name`,
	`delivery_date`,
	`status`,
	`service_value`
) VALUES (
	'8T8U8Z',
 	'1',
	'123456',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis.',
	'Rosa Godinho Piteira',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies molestie posuere. Aliquam eget neque finibus, mollis diam et, tincidunt mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ultrices turpis eget nulla viverra gravida. Duis libero risus, mollis eu condimentum vel, vehicula varius ante. Suspendisse placerat tortor sed interdum condimentum. Aliquam quis urna augue. Nunc ornare lacinia lectus ac congue. Suspendisse porta justo at nunc sagittis, a mollis metus tempor. Vivamus ultrices vel enim vitae blandit. Praesent vel lorem turpis.',
	'Smartphone Poco X3',
	'2021-10-20 03:14:07',
	'0',
	'199.99'
 );

INSERT INTO `service_order`(
    `service_order_id`,
    `user_id`,
    `senha`,
    `owner_information`,
    `owner_name`,
    `description`,
	`device_name`,
    `delivery_date`,
    `status`,
    `service_value`
) VALUES (
	'XJY44Z',
	'1',
    '123456',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis.',
    'Esmeralda Lages',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies molestie posuere. Aliquam eget neque finibus, mollis diam et, tincidunt mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ultrices turpis eget nulla viverra gravida. Duis libero risus, mollis eu condimentum vel, vehicula varius ante. Suspendisse placerat tortor sed interdum condimentum. Aliquam quis urna augue. Nunc ornare lacinia lectus ac congue. Suspendisse porta justo at nunc sagittis, a mollis metus tempor. Vivamus ultrices vel enim vitae blandit. Praesent vel lorem turpis.',
    'Smartphone Poco X3',
    '2021-10-20 03:14:07',
    '0',
    '500.00'
);

INSERT INTO `service_order`(
    `service_order_id`,
    `user_id`,
    `senha`,
    `owner_information`,
    `owner_name`,
    `description`,
	`device_name`,
    `delivery_date`,
    `completion_date`,
    `status`,
    `service_value`
) VALUES (
	'T3BVVM',
	'1',
    '123456',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis.',
    'Ângelo Ouro Cavalheiro',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies molestie posuere. Aliquam eget neque finibus, mollis diam et, tincidunt mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ultrices turpis eget nulla viverra gravida. Duis libero risus, mollis eu condimentum vel, vehicula varius ante. Suspendisse placerat tortor sed interdum condimentum. Aliquam quis urna augue. Nunc ornare lacinia lectus ac congue. Suspendisse porta justo at nunc sagittis, a mollis metus tempor. Vivamus ultrices vel enim vitae blandit. Praesent vel lorem turpis.',
    'Galaxy S21',
    '2021-10-20 03:14:07',
    '2021-10-26 18:50:00',
    '1',
    '500.00'
);

INSERT INTO `service_order`(
    `service_order_id`,
    `user_id`,
    `senha`,
    `owner_information`,
    `owner_name`,
    `description`,
	`device_name`,
    `delivery_date`,
    `status`,
    `service_value`
) VALUES (
	'PXACBF',
	'2',
    '123456',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis.',
    'Amado Amoroso',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies molestie posuere. Aliquam eget neque finibus, mollis diam et, tincidunt mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ultrices turpis eget nulla viverra gravida. Duis libero risus, mollis eu condimentum vel, vehicula varius ante. Suspendisse placerat tortor sed interdum condimentum. Aliquam quis urna augue. Nunc ornare lacinia lectus ac congue. Suspendisse porta justo at nunc sagittis, a mollis metus tempor. Vivamus ultrices vel enim vitae blandit. Praesent vel lorem turpis.',
    'Moto X',
    '2021-10-20 03:14:07',
    '0',
    '500.00'
);"