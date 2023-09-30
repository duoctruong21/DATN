IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [album] (
        [id] int NOT NULL IDENTITY,
        [AlbumName] nvarchar(100) NULL,
        [AlbumDescription] nvarchar(500) NULL,
        [AlbumImg] nvarchar(300) NULL,
        [CreatedDate] date NULL,
        [ModifiedDate] date NULL,
        [alias] nvarchar(200) NULL,
        [iduser] int NULL,
        CONSTRAINT [PK__album__3213E83FEBFF353B] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [category] (
        [id] int NOT NULL IDENTITY,
        [CategoryName] nvarchar(100) NULL,
        [CategoryDescription] nvarchar(500) NULL,
        [CategoryImg] nvarchar(500) NULL,
        [CreatedDate] date NULL,
        [ModifiedDate] date NULL,
        [alias] nvarchar(200) NULL,
        CONSTRAINT [PK__category__3213E83F3DC5CB31] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [singer] (
        [id] int NOT NULL IDENTITY,
        [singerName] nvarchar(100) NULL,
        [singerDescription] nvarchar(500) NULL,
        [singerInfomation] nvarchar(500) NULL,
        [CreatedDate] date NULL,
        [CreatedBy] nvarchar(100) NULL,
        [ModifiedDate] date NULL,
        [ModifiedBy] nvarchar(100) NULL,
        [fileimg] nvarchar(400) NULL,
        [alias] nvarchar(200) NULL,
        CONSTRAINT [PK__singer__3213E83F9DF97DE0] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [topic] (
        [id] int NOT NULL IDENTITY,
        [TopicName] nvarchar(100) NULL,
        [TopicDescription] nvarchar(500) NULL,
        [TopicImg] nvarchar(500) NULL,
        [CreatedDate] date NULL,
        [ModifiedDate] date NULL,
        [alias] nvarchar(200) NULL,
        CONSTRAINT [PK__topic__3213E83F9794D3E3] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [UserWebMusic] (
        [id] int NOT NULL IDENTITY,
        [gmail] nvarchar(50) NULL,
        [password] nvarchar(50) NULL,
        [isActive] bit NULL,
        [firstName] nvarchar(100) NULL,
        [LastName] nvarchar(50) NULL,
        [linkAvatar] nvarchar(200) NULL,
        [note] nvarchar(300) NULL,
        CONSTRAINT [PK_UserWebMusic] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [CategoryWithAlbum] (
        [idAlbum] int NOT NULL,
        [idCategory] int NOT NULL,
        CONSTRAINT [PK__Category__8787315383D5252F] PRIMARY KEY ([idAlbum], [idCategory]),
        CONSTRAINT [FK__CategoryW__idAlb__412EB0B6] FOREIGN KEY ([idAlbum]) REFERENCES [album] ([id]),
        CONSTRAINT [FK__CategoryW__idCat__4222D4EF] FOREIGN KEY ([idCategory]) REFERENCES [category] ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [song] (
        [id] int NOT NULL IDENTITY,
        [songName] nvarchar(100) NULL,
        [viewCount] int NULL,
        [ListenCount] int NULL,
        [likeCount] int NULL,
        [songDescription] nvarchar(500) NULL,
        [LyricSong] nvarchar(max) NULL,
        [CreatedDate] date NULL,
        [CreatedBy] nvarchar(100) NULL,
        [ModifiedDate] date NULL,
        [idSinger] int NULL,
        [filesong] nvarchar(500) NULL,
        [fileimg] nvarchar(400) NULL,
        [idAlbum] int NULL,
        [alias] nvarchar(200) NULL,
        [recentListendate] datetime NULL,
        [idtopic] int NULL,
        [idcategory] int NULL,
        CONSTRAINT [PK__song__3213E83F30E44511] PRIMARY KEY ([id]),
        CONSTRAINT [FK__song__idSinger__4CA06362] FOREIGN KEY ([idSinger]) REFERENCES [singer] ([id]),
        CONSTRAINT [FK__song__idcategory__4E53A1AA] FOREIGN KEY ([idcategory]) REFERENCES [category] ([id]),
        CONSTRAINT [FK__song__idtopic__4D5F7D71] FOREIGN KEY ([idtopic]) REFERENCES [topic] ([id]),
        CONSTRAINT [fk_idalbum] FOREIGN KEY ([idAlbum]) REFERENCES [album] ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [albumuser] (
        [id] int NOT NULL IDENTITY,
        [idalbum] int NULL,
        [idsong] int NULL,
        [idcategory] int NULL,
        CONSTRAINT [PK__albumuse__3213E83FB1134762] PRIMARY KEY ([id]),
        CONSTRAINT [FK__albumuser__idalb__47A6A41B] FOREIGN KEY ([idalbum]) REFERENCES [album] ([id]),
        CONSTRAINT [FK__albumuser__idson__489AC854] FOREIGN KEY ([idsong]) REFERENCES [song] ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [AlbumWithSong] (
        [idAlbum] int NOT NULL,
        [idSong] int NOT NULL,
        CONSTRAINT [PK__AlbumWit__2C6A336212C7C74E] PRIMARY KEY ([idAlbum], [idSong]),
        CONSTRAINT [FK__AlbumWith__idAlb__4F7CD00D] FOREIGN KEY ([idAlbum]) REFERENCES [album] ([id]),
        CONSTRAINT [FK__AlbumWith__idSon__5070F446] FOREIGN KEY ([idSong]) REFERENCES [song] ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [categoryWithSong] (
        [id] int NOT NULL IDENTITY,
        [idcategory] int NULL,
        [idsong] int NULL,
        CONSTRAINT [PK__category__3213E83F8B2338B1] PRIMARY KEY ([id]),
        CONSTRAINT [FK__categoryW__idcat__625A9A57] FOREIGN KEY ([idcategory]) REFERENCES [category] ([id]),
        CONSTRAINT [FK__categoryW__idson__634EBE90] FOREIGN KEY ([idsong]) REFERENCES [song] ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [history] (
        [id] int NOT NULL IDENTITY,
        [iduser] int NULL,
        [idsong] int NULL,
        [countlisten] int NULL,
        [listened] bit NULL,
        [listendate] datetime NULL,
        CONSTRAINT [PK__history__3213E83F9524EAC5] PRIMARY KEY ([id]),
        CONSTRAINT [FK__history__idsong__3D2915A8] FOREIGN KEY ([idsong]) REFERENCES [song] ([id]),
        CONSTRAINT [FK__history__iduser__3C34F16F] FOREIGN KEY ([iduser]) REFERENCES [UserWebMusic] ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE TABLE [topicwithsong] (
        [id] int NOT NULL IDENTITY,
        [idtopic] int NULL,
        [idsong] int NULL,
        CONSTRAINT [PK__topicwit__3213E83FD48995C6] PRIMARY KEY ([id]),
        CONSTRAINT [FK__topicwith__idson__671F4F74] FOREIGN KEY ([idsong]) REFERENCES [song] ([id]),
        CONSTRAINT [FK__topicwith__idtop__662B2B3B] FOREIGN KEY ([idtopic]) REFERENCES [topic] ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_albumuser_idalbum] ON [albumuser] ([idalbum]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_albumuser_idsong] ON [albumuser] ([idsong]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_AlbumWithSong_idSong] ON [AlbumWithSong] ([idSong]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_CategoryWithAlbum_idCategory] ON [CategoryWithAlbum] ([idCategory]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_categoryWithSong_idcategory] ON [categoryWithSong] ([idcategory]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_categoryWithSong_idsong] ON [categoryWithSong] ([idsong]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_history_idsong] ON [history] ([idsong]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_history_iduser] ON [history] ([iduser]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_song_idAlbum] ON [song] ([idAlbum]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_song_idcategory] ON [song] ([idcategory]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_song_idSinger] ON [song] ([idSinger]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_song_idtopic] ON [song] ([idtopic]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_topicwithsong_idsong] ON [topicwithsong] ([idsong]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    CREATE INDEX [IX_topicwithsong_idtopic] ON [topicwithsong] ([idtopic]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230623203054_mssql.onprem_migration_591')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230623203054_mssql.onprem_migration_591', N'7.0.5');
END;
GO

COMMIT;
GO

