/*CREATE TABLE `talelorz`.`users` (`serviceId` VARCHAR(45) NULL DEFAULT NULL,`snsId` VARCHAR(60) NULL DEFAULT NULL,`provider` VARCHAR(45) NULL DEFAULT NULL,`userId` VARCHAR(45) NOT NULL,`firstName` VARCHAR(45) NOT NULL,`lastName` VARCHAR(45) NOT NULL,`gender` INT NOT NULL,`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE INDEX `serviceId_UNIQUE` (`serviceId` ASC) VISIBLE,PRIMARY KEY (`userId`),UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE) DEFAULT CHARACTER SET = utf8mb4;
*/
/*
INSERT INTO `talelorz`.`users`(serviceId, snsId, provider, userId, firstName, lastName, gender)
VALUES (NULL, 10101010, 'KAKAO', 'havingfunn', '한준', '김', 0)
*/

select * from talelorz.posts_user_tags