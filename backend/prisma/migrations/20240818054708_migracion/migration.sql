-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(45) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `contrase_a` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recordatorio` (
    `id_recordatorio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_recordatorio` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_final` DATETIME(3) NOT NULL,
    `prioridad` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_recordatorio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recordatorio` ADD CONSTRAINT `Recordatorio_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
