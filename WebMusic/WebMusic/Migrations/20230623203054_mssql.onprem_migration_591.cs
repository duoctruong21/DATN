using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebMusic.Migrations
{
    /// <inheritdoc />
    public partial class mssqlonprem_migration_591 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "album",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AlbumName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    AlbumDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    AlbumImg = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "date", nullable: true),
                    alias = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    iduser = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__album__3213E83FEBFF353B", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "category",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CategoryDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CategoryImg = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "date", nullable: true),
                    alias = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__category__3213E83F3DC5CB31", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "singer",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    singerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    singerDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    singerInfomation = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "date", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    fileimg = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    alias = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__singer__3213E83F9DF97DE0", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "topic",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TopicName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TopicDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TopicImg = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "date", nullable: true),
                    alias = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__topic__3213E83F9794D3E3", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "UserWebMusic",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    gmail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    isActive = table.Column<bool>(type: "bit", nullable: true),
                    firstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    linkAvatar = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    note = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWebMusic", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "CategoryWithAlbum",
                columns: table => new
                {
                    idAlbum = table.Column<int>(type: "int", nullable: false),
                    idCategory = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__8787315383D5252F", x => new { x.idAlbum, x.idCategory });
                    table.ForeignKey(
                        name: "FK__CategoryW__idAlb__412EB0B6",
                        column: x => x.idAlbum,
                        principalTable: "album",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__CategoryW__idCat__4222D4EF",
                        column: x => x.idCategory,
                        principalTable: "category",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "song",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    songName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    viewCount = table.Column<int>(type: "int", nullable: true),
                    ListenCount = table.Column<int>(type: "int", nullable: true),
                    likeCount = table.Column<int>(type: "int", nullable: true),
                    songDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    LyricSong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "date", nullable: true),
                    idSinger = table.Column<int>(type: "int", nullable: true),
                    filesong = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    fileimg = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    idAlbum = table.Column<int>(type: "int", nullable: true),
                    alias = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    recentListendate = table.Column<DateTime>(type: "datetime", nullable: true),
                    idtopic = table.Column<int>(type: "int", nullable: true),
                    idcategory = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__song__3213E83F30E44511", x => x.id);
                    table.ForeignKey(
                        name: "FK__song__idSinger__4CA06362",
                        column: x => x.idSinger,
                        principalTable: "singer",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__song__idcategory__4E53A1AA",
                        column: x => x.idcategory,
                        principalTable: "category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__song__idtopic__4D5F7D71",
                        column: x => x.idtopic,
                        principalTable: "topic",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_idalbum",
                        column: x => x.idAlbum,
                        principalTable: "album",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "albumuser",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idalbum = table.Column<int>(type: "int", nullable: true),
                    idsong = table.Column<int>(type: "int", nullable: true),
                    idcategory = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__albumuse__3213E83FB1134762", x => x.id);
                    table.ForeignKey(
                        name: "FK__albumuser__idalb__47A6A41B",
                        column: x => x.idalbum,
                        principalTable: "album",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__albumuser__idson__489AC854",
                        column: x => x.idsong,
                        principalTable: "song",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "AlbumWithSong",
                columns: table => new
                {
                    idAlbum = table.Column<int>(type: "int", nullable: false),
                    idSong = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AlbumWit__2C6A336212C7C74E", x => new { x.idAlbum, x.idSong });
                    table.ForeignKey(
                        name: "FK__AlbumWith__idAlb__4F7CD00D",
                        column: x => x.idAlbum,
                        principalTable: "album",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__AlbumWith__idSon__5070F446",
                        column: x => x.idSong,
                        principalTable: "song",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "categoryWithSong",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idcategory = table.Column<int>(type: "int", nullable: true),
                    idsong = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__category__3213E83F8B2338B1", x => x.id);
                    table.ForeignKey(
                        name: "FK__categoryW__idcat__625A9A57",
                        column: x => x.idcategory,
                        principalTable: "category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__categoryW__idson__634EBE90",
                        column: x => x.idsong,
                        principalTable: "song",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "history",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    iduser = table.Column<int>(type: "int", nullable: true),
                    idsong = table.Column<int>(type: "int", nullable: true),
                    countlisten = table.Column<int>(type: "int", nullable: true),
                    listened = table.Column<bool>(type: "bit", nullable: true),
                    listendate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__history__3213E83F9524EAC5", x => x.id);
                    table.ForeignKey(
                        name: "FK__history__idsong__3D2915A8",
                        column: x => x.idsong,
                        principalTable: "song",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__history__iduser__3C34F16F",
                        column: x => x.iduser,
                        principalTable: "UserWebMusic",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "topicwithsong",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idtopic = table.Column<int>(type: "int", nullable: true),
                    idsong = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__topicwit__3213E83FD48995C6", x => x.id);
                    table.ForeignKey(
                        name: "FK__topicwith__idson__671F4F74",
                        column: x => x.idsong,
                        principalTable: "song",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__topicwith__idtop__662B2B3B",
                        column: x => x.idtopic,
                        principalTable: "topic",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_albumuser_idalbum",
                table: "albumuser",
                column: "idalbum");

            migrationBuilder.CreateIndex(
                name: "IX_albumuser_idsong",
                table: "albumuser",
                column: "idsong");

            migrationBuilder.CreateIndex(
                name: "IX_AlbumWithSong_idSong",
                table: "AlbumWithSong",
                column: "idSong");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryWithAlbum_idCategory",
                table: "CategoryWithAlbum",
                column: "idCategory");

            migrationBuilder.CreateIndex(
                name: "IX_categoryWithSong_idcategory",
                table: "categoryWithSong",
                column: "idcategory");

            migrationBuilder.CreateIndex(
                name: "IX_categoryWithSong_idsong",
                table: "categoryWithSong",
                column: "idsong");

            migrationBuilder.CreateIndex(
                name: "IX_history_idsong",
                table: "history",
                column: "idsong");

            migrationBuilder.CreateIndex(
                name: "IX_history_iduser",
                table: "history",
                column: "iduser");

            migrationBuilder.CreateIndex(
                name: "IX_song_idAlbum",
                table: "song",
                column: "idAlbum");

            migrationBuilder.CreateIndex(
                name: "IX_song_idcategory",
                table: "song",
                column: "idcategory");

            migrationBuilder.CreateIndex(
                name: "IX_song_idSinger",
                table: "song",
                column: "idSinger");

            migrationBuilder.CreateIndex(
                name: "IX_song_idtopic",
                table: "song",
                column: "idtopic");

            migrationBuilder.CreateIndex(
                name: "IX_topicwithsong_idsong",
                table: "topicwithsong",
                column: "idsong");

            migrationBuilder.CreateIndex(
                name: "IX_topicwithsong_idtopic",
                table: "topicwithsong",
                column: "idtopic");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "albumuser");

            migrationBuilder.DropTable(
                name: "AlbumWithSong");

            migrationBuilder.DropTable(
                name: "CategoryWithAlbum");

            migrationBuilder.DropTable(
                name: "categoryWithSong");

            migrationBuilder.DropTable(
                name: "history");

            migrationBuilder.DropTable(
                name: "topicwithsong");

            migrationBuilder.DropTable(
                name: "UserWebMusic");

            migrationBuilder.DropTable(
                name: "song");

            migrationBuilder.DropTable(
                name: "singer");

            migrationBuilder.DropTable(
                name: "category");

            migrationBuilder.DropTable(
                name: "topic");

            migrationBuilder.DropTable(
                name: "album");
        }
    }
}
