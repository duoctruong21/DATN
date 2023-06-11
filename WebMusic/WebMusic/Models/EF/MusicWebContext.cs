using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebMusic.Models.Data;

namespace WebMusic.Models.EF;

public partial class MusicWebContext : DbContext
{
    public MusicWebContext()
    {
    }

    public MusicWebContext(DbContextOptions<MusicWebContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Album> Albums { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Singer> Singers { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    public virtual DbSet<Topic> Topics { get; set; }

    public virtual DbSet<UserWebMusic> UserWebMusics { get; set; }

    public virtual DbSet<UserWithSong> UserWithSongs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-CQUSV1J\\DUOCTRUONG;Initial Catalog=MusicWeb;Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Album>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__album__3213E83FEBFF353B");

            entity.ToTable("album");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AlbumDescription).HasMaxLength(500);
            entity.Property(e => e.AlbumImg).HasMaxLength(300);
            entity.Property(e => e.AlbumName).HasMaxLength(100);
            entity.Property(e => e.Alias)
                .HasMaxLength(200)
                .HasColumnName("alias");
            entity.Property(e => e.CreatedDate).HasColumnType("date");
            entity.Property(e => e.ModifiedDate).HasColumnType("date");

            entity.HasMany(d => d.IdCategories).WithMany(p => p.IdAlbums)
                .UsingEntity<Dictionary<string, object>>(
                    "CategoryWithAlbum",
                    r => r.HasOne<Category>().WithMany()
                        .HasForeignKey("IdCategory")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__CategoryW__idCat__4222D4EF"),
                    l => l.HasOne<Album>().WithMany()
                        .HasForeignKey("IdAlbum")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__CategoryW__idAlb__412EB0B6"),
                    j =>
                    {
                        j.HasKey("IdAlbum", "IdCategory").HasName("PK__Category__8787315383D5252F");
                        j.ToTable("CategoryWithAlbum");
                        j.IndexerProperty<int>("IdAlbum").HasColumnName("idAlbum");
                        j.IndexerProperty<int>("IdCategory").HasColumnName("idCategory");
                    });

            entity.HasMany(d => d.IdSongs).WithMany(p => p.IdAlbums)
                .UsingEntity<Dictionary<string, object>>(
                    "AlbumWithSong",
                    r => r.HasOne<Song>().WithMany()
                        .HasForeignKey("IdSong")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__AlbumWith__idSon__5070F446"),
                    l => l.HasOne<Album>().WithMany()
                        .HasForeignKey("IdAlbum")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__AlbumWith__idAlb__4F7CD00D"),
                    j =>
                    {
                        j.HasKey("IdAlbum", "IdSong").HasName("PK__AlbumWit__2C6A336212C7C74E");
                        j.ToTable("AlbumWithSong");
                        j.IndexerProperty<int>("IdAlbum").HasColumnName("idAlbum");
                        j.IndexerProperty<int>("IdSong").HasColumnName("idSong");
                    });
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__category__3213E83F3DC5CB31");

            entity.ToTable("category");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryDescription).HasMaxLength(500);
            entity.Property(e => e.CategoryImg).HasMaxLength(500);
            entity.Property(e => e.CategoryName).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("date");
            entity.Property(e => e.ModifiedDate).HasColumnType("date");
        });

        modelBuilder.Entity<Singer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__singer__3213E83F9DF97DE0");

            entity.ToTable("singer");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Alias)
                .HasMaxLength(200)
                .HasColumnName("alias");
            entity.Property(e => e.CreatedBy).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("date");
            entity.Property(e => e.Fileimg)
                .HasMaxLength(400)
                .HasColumnName("fileimg");
            entity.Property(e => e.ModifiedBy).HasMaxLength(100);
            entity.Property(e => e.ModifiedDate).HasColumnType("date");
            entity.Property(e => e.SingerDescription)
                .HasMaxLength(500)
                .HasColumnName("singerDescription");
            entity.Property(e => e.SingerInfomation)
                .HasMaxLength(500)
                .HasColumnName("singerInfomation");
            entity.Property(e => e.SingerName)
                .HasMaxLength(100)
                .HasColumnName("singerName");
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__song__3213E83F30E44511");

            entity.ToTable("song");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Alias)
                .HasMaxLength(200)
                .HasColumnName("alias");
            entity.Property(e => e.CreatedBy).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("date");
            entity.Property(e => e.Downloadsong)
                .HasMaxLength(200)
                .HasColumnName("downloadsong");
            entity.Property(e => e.Fileimg)
                .HasMaxLength(400)
                .HasColumnName("fileimg");
            entity.Property(e => e.Filesong)
                .HasMaxLength(500)
                .HasColumnName("filesong");
            entity.Property(e => e.IdAlbum).HasColumnName("idAlbum");
            entity.Property(e => e.IdSinger).HasColumnName("idSinger");
            entity.Property(e => e.LikeCount).HasColumnName("likeCount");
            entity.Property(e => e.ModifiedDate).HasColumnType("date");
            entity.Property(e => e.SongDescription)
                .HasMaxLength(500)
                .HasColumnName("songDescription");
            entity.Property(e => e.SongName)
                .HasMaxLength(100)
                .HasColumnName("songName");
            entity.Property(e => e.ViewCount).HasColumnName("viewCount");

            entity.HasOne(d => d.IdAlbumNavigation).WithMany(p => p.Songs)
                .HasForeignKey(d => d.IdAlbum)
                .HasConstraintName("fk_idalbum");

            entity.HasOne(d => d.IdSingerNavigation).WithMany(p => p.Songs)
                .HasForeignKey(d => d.IdSinger)
                .HasConstraintName("FK__song__idSinger__4CA06362");
        });

        modelBuilder.Entity<Topic>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__topic__3213E83F9794D3E3");

            entity.ToTable("topic");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Alias)
                .HasMaxLength(200)
                .HasColumnName("alias");
            entity.Property(e => e.CreatedDate).HasColumnType("date");
            entity.Property(e => e.ModifiedDate).HasColumnType("date");
            entity.Property(e => e.TopicDescription).HasMaxLength(500);
            entity.Property(e => e.TopicImg).HasMaxLength(500);
            entity.Property(e => e.TopicName).HasMaxLength(100);

            entity.HasMany(d => d.IdCategories).WithMany(p => p.IdTopics)
                .UsingEntity<Dictionary<string, object>>(
                    "TopicWithCategory",
                    r => r.HasOne<Category>().WithMany()
                        .HasForeignKey("IdCategory")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__topicWith__idCat__3C69FB99"),
                    l => l.HasOne<Topic>().WithMany()
                        .HasForeignKey("IdTopic")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__topicWith__idTop__3B75D760"),
                    j =>
                    {
                        j.HasKey("IdTopic", "IdCategory").HasName("PK__topicWit__F3DDCA6E2B0F6DE9");
                        j.ToTable("topicWithCategory");
                        j.IndexerProperty<int>("IdTopic").HasColumnName("idTopic");
                        j.IndexerProperty<int>("IdCategory").HasColumnName("idCategory");
                    });
        });

        modelBuilder.Entity<UserWebMusic>(entity =>
        {
            entity.ToTable("UserWebMusic");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("firstName");
            entity.Property(e => e.Gmail)
                .HasMaxLength(50)
                .HasColumnName("gmail");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.LinkAvatar)
                .HasMaxLength(200)
                .HasColumnName("linkAvatar");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
        });

        modelBuilder.Entity<UserWithSong>(entity =>
        {
            entity.HasKey(e => new { e.Iduser, e.Idsong }).HasName("PK__UserWith__740AC515298787E5");

            entity.ToTable("UserWithSong");

            entity.Property(e => e.Iduser)
                .HasMaxLength(300)
                .HasColumnName("iduser");
            entity.Property(e => e.Idsong).HasColumnName("idsong");
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .HasColumnName("status");

            entity.HasOne(d => d.IdsongNavigation).WithMany(p => p.UserWithSongs)
                .HasForeignKey(d => d.Idsong)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserWithS__idson__534D60F1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
