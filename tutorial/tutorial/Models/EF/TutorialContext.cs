using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace tutorial.Models.EF;

public partial class TutorialContext : DbContext
{
    public TutorialContext()
    {
    }

    public TutorialContext(DbContextOptions<TutorialContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TbAccount> TbAccounts { get; set; }

    public virtual DbSet<TbCategory> TbCategories { get; set; }

    public virtual DbSet<TbContent> TbContents { get; set; }

    public virtual DbSet<TbEvaluaTutorial> TbEvaluaTutorials { get; set; }

    public virtual DbSet<TbOptionEvalua> TbOptionEvaluas { get; set; }

    public virtual DbSet<TbOptionTutorial> TbOptionTutorials { get; set; }

    public virtual DbSet<TbRequestComment> TbRequestComments { get; set; }

    public virtual DbSet<TbRole> TbRoles { get; set; }

    public virtual DbSet<TbRoleAccount> TbRoleAccounts { get; set; }

    public virtual DbSet<TbTutorial> TbTutorials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-CQUSV1J\\DUOCTRUONG;Initial Catalog=Tutorial;Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TbAccount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tb_accou__3213E83F01667AB6");

            entity.ToTable("tb_account");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .HasColumnName("address");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(150)
                .HasColumnName("fullName");
            entity.Property(e => e.Img)
                .HasMaxLength(500)
                .HasColumnName("img");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasColumnName("password");
            entity.Property(e => e.Token)
                .HasMaxLength(1028)
                .HasColumnName("token");
        });

        modelBuilder.Entity<TbCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tb_categ__3213E83F75A2CDB5");

            entity.ToTable("tb_category");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Alias)
                .HasMaxLength(150)
                .HasColumnName("alias");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.Img)
                .HasMaxLength(500)
                .HasColumnName("img");
            entity.Property(e => e.ModifiedBy).HasColumnName("modifiedBy");
            entity.Property(e => e.ModifiedDate)
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .HasColumnName("name");
        });

        modelBuilder.Entity<TbContent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tb_conte__3213E83FEBEA72D5");

            entity.ToTable("tb_content");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdTutorial).HasColumnName("id_tutorial");
            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.ModifiedDate)
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");

            entity.HasOne(d => d.IdTutorialNavigation).WithMany(p => p.TbContents)
                .HasForeignKey(d => d.IdTutorial)
                .HasConstraintName("fk_idtutorial_content");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.TbContents)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("fk_iduser_content");
        });

        modelBuilder.Entity<TbEvaluaTutorial>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tb_evalu__3213E83F08F6E691");

            entity.ToTable("tb_evalua_tutorial");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Comment)
                .HasMaxLength(500)
                .HasColumnName("comment");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdContent).HasColumnName("id_content");
            entity.Property(e => e.IdOptionEvalua).HasColumnName("id_option_evalua");
            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.ModifiedDate)
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");

            entity.HasOne(d => d.IdContentNavigation).WithMany(p => p.TbEvaluaTutorials)
                .HasForeignKey(d => d.IdContent)
                .HasConstraintName("fk_idcontent_evalua_tutorial");

            entity.HasOne(d => d.IdOptionEvaluaNavigation).WithMany(p => p.TbEvaluaTutorials)
                .HasForeignKey(d => d.IdOptionEvalua)
                .HasConstraintName("fk_idoptionevalue_evalua_tutorial");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.TbEvaluaTutorials)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("fk_iduser_evalua_tutorial");
        });

        modelBuilder.Entity<TbOptionEvalua>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tb_optio__3213E83FE9964AA5");

            entity.ToTable("tb_option_evalua");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .HasColumnName("name");
        });

        modelBuilder.Entity<TbOptionTutorial>(entity =>
        {
            entity.HasKey(e => new { e.IdUser, e.IdContent }).HasName("PK__tb_optio__313645E2B73B2F10");

            entity.ToTable("tb_option_tutorial");

            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.IdContent).HasColumnName("id_content");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdOptionEvalua).HasColumnName("id_option_evalua");
            entity.Property(e => e.ModifiedDate)
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");

            entity.HasOne(d => d.IdContentNavigation).WithMany(p => p.TbOptionTutorials)
                .HasForeignKey(d => d.IdContent)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_idcontent_option_tutorial");

            entity.HasOne(d => d.IdOptionEvaluaNavigation).WithMany(p => p.TbOptionTutorials)
                .HasForeignKey(d => d.IdOptionEvalua)
                .HasConstraintName("fk_idoptionevalue__option_tutorial");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.TbOptionTutorials)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_iduser_option_tutorial");
        });

        modelBuilder.Entity<TbRequestComment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tb_reque__3213E83FAE628617");

            entity.ToTable("tb_request_comment");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Comment)
                .HasMaxLength(500)
                .HasColumnName("comment");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdEvaluaTutorial).HasColumnName("id_evalua_tutorial");
            entity.Property(e => e.IdOptionEvalua).HasColumnName("id_option_evalua");
            entity.Property(e => e.IdUserComment).HasColumnName("id_user_comment");
            entity.Property(e => e.IdUserResponse).HasColumnName("id_user_response");
            entity.Property(e => e.ModifiedDate)
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");

            entity.HasOne(d => d.IdEvaluaTutorialNavigation).WithMany(p => p.TbRequestComments)
                .HasForeignKey(d => d.IdEvaluaTutorial)
                .HasConstraintName("fk_idevaluatutorial_request_comment");

            entity.HasOne(d => d.IdOptionEvaluaNavigation).WithMany(p => p.TbRequestComments)
                .HasForeignKey(d => d.IdOptionEvalua)
                .HasConstraintName("fk_idoptionevalue_request_comment");

            entity.HasOne(d => d.IdUserCommentNavigation).WithMany(p => p.TbRequestCommentIdUserCommentNavigations)
                .HasForeignKey(d => d.IdUserComment)
                .HasConstraintName("fk_iduserComment_request_comment");

            entity.HasOne(d => d.IdUserResponseNavigation).WithMany(p => p.TbRequestCommentIdUserResponseNavigations)
                .HasForeignKey(d => d.IdUserResponse)
                .HasConstraintName("fk_iduserRespone_request_comment");
        });

        modelBuilder.Entity<TbRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tb_role__3213E83F9355D7F7");

            entity.ToTable("tb_role");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<TbRoleAccount>(entity =>
        {
            entity.HasKey(e => new { e.IdUser, e.IdRole }).HasName("PK__tb_role___1105C2761235DBE8");

            entity.ToTable("tb_role_account");

            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.IdRole).HasColumnName("id_role");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.ModifiedDate)
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");

            entity.HasOne(d => d.IdRoleNavigation).WithMany(p => p.TbRoleAccounts)
                .HasForeignKey(d => d.IdRole)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_role_role_account");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.TbRoleAccounts)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_iduser_role_account");
        });

        modelBuilder.Entity<TbTutorial>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tb_tutor__3213E83FF2DD644D");

            entity.ToTable("tb_tutorial");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdCategory).HasColumnName("id_category");
            entity.Property(e => e.Img)
                .HasMaxLength(500)
                .HasColumnName("img");
            entity.Property(e => e.ModifiedBy).HasColumnName("modifiedBy");
            entity.Property(e => e.ModifiedDate)
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");
            entity.Property(e => e.Name)
                .HasMaxLength(250)
                .HasColumnName("name");

            entity.HasOne(d => d.IdCategoryNavigation).WithMany(p => p.TbTutorials)
                .HasForeignKey(d => d.IdCategory)
                .HasConstraintName("fk_idCategory_tutorial");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
