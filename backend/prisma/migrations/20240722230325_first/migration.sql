-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(45) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `contraseña` VARCHAR(45) NOT NULL,
    `recordatorio_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recordatorio` (
    `id_recordatorio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_recordatorio` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_recordatorio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prioridad` (
    `id_prioridad` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_prioridad` VARCHAR(45) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_prioridad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `recordatorios` FOREIGN KEY (`recordatorio_id`) REFERENCES `recordatorio`(`id_recordatorio`) ON DELETE RESTRICT ON UPDATE CASCADE;
