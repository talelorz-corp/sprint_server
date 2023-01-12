/*
CREATE TABLE `talelorz`.`posts` (
  `idposts` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idposts`),
  INDEX `TIMECURSOR` USING BTREE (`created_at`) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;
*/
/*
CREATE TABLE `talelorz`.`posts_user_tags` (
  `postId` INT NOT NULL,
  `targetUserId` VARCHAR(45) NOT NULL,
  INDEX `POSTID` (`postId` ASC) INVISIBLE,
  INDEX `TARGETUSER` (`targetUserId` ASC) INVISIBLE,
  CONSTRAINT `FK_POSTID`
    FOREIGN KEY (`postId`)
    REFERENCES `talelorz`.`posts` (`idposts`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_TAG_USERID`
    FOREIGN KEY (`targetUserId`)
    REFERENCES `talelorz`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;
*/

/*

*/
