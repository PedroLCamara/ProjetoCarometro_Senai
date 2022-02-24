using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using carometro.webapi.Domains;

#nullable disable

namespace carometro.webapi.Contexts
{
    public partial class carometroContext : DbContext
    {
        public carometroContext()
        {
        }

        public carometroContext(DbContextOptions<carometroContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Aluno> Alunos { get; set; }
        public virtual DbSet<Comentario> Comentarios { get; set; }
        public virtual DbSet<Tipousuario> Tipousuarios { get; set; }
        public virtual DbSet<Turma> Turmas { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=NOTE011EI1\\SQLEXPRESS; initial catalog=carometro; user Id=sa; pwd=Senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Aluno>(entity =>
            {
                entity.HasKey(e => e.IdAluno)
                    .HasName("PK__ALUNO__0C5BC8491555BBB1");

                entity.ToTable("ALUNO");

                entity.Property(e => e.IdAluno).HasColumnName("idAluno");

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasMaxLength(14)
                    .IsUnicode(false)
                    .HasColumnName("CPF")
                    .IsFixedLength(true);

                entity.Property(e => e.DataNascimento)
                    .HasColumnType("date")
                    .HasColumnName("dataNascimento");

                entity.Property(e => e.EmailAluno)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("emailAluno");

                entity.Property(e => e.EmailResponsavel)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("emailResponsavel");

                entity.Property(e => e.IdTurma).HasColumnName("idTurma");

                entity.Property(e => e.NomeAluno)
                    .IsRequired()
                    .HasMaxLength(90)
                    .IsUnicode(false)
                    .HasColumnName("nomeAluno");

                entity.Property(e => e.Rm)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("RM");

                entity.Property(e => e.TelefoneCel)
                    .IsRequired()
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("telefoneCel");

                entity.Property(e => e.TelefoneFixo)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("telefoneFixo");

                entity.Property(e => e.Urlimg)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("URLimg");

                entity.HasOne(d => d.IdTurmaNavigation)
                    .WithMany(p => p.Alunos)
                    .HasForeignKey(d => d.IdTurma)
                    .HasConstraintName("FK__ALUNO__idTurma__2D27B809");
            });

            modelBuilder.Entity<Comentario>(entity =>
            {
                entity.HasKey(e => e.IdComentario)
                    .HasName("PK__COMENTAR__C74515DA09874149");

                entity.ToTable("COMENTARIO");

                entity.HasIndex(e => e.Descricao, "UQ__COMENTAR__91D38C289D379E3B")
                    .IsUnique();

                entity.Property(e => e.IdComentario).HasColumnName("idComentario");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("descricao");

                entity.Property(e => e.IdAluno).HasColumnName("idAluno");

                entity.HasOne(d => d.IdAlunoNavigation)
                    .WithMany(p => p.Comentarios)
                    .HasForeignKey(d => d.IdAluno)
                    .HasConstraintName("FK__COMENTARI__idAlu__30F848ED");
            });

            modelBuilder.Entity<Tipousuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__TIPOUSUA__03006BFF47E4C6B1");

                entity.ToTable("TIPOUSUARIO");

                entity.Property(e => e.IdTipoUsuario)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("idTipoUsuario");

                entity.Property(e => e.NomeTipoUsuario)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("nomeTipoUsuario");
            });

            modelBuilder.Entity<Turma>(entity =>
            {
                entity.HasKey(e => e.IdTurma)
                    .HasName("PK__TURMA__AA068310948621FE");

                entity.ToTable("TURMA");

                entity.Property(e => e.IdTurma)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("idTurma");

                entity.Property(e => e.DescricaoTurma)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("descricaoTurma");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__USUARIO__645723A660D280A3");

                entity.ToTable("USUARIO");

                entity.HasIndex(e => e.NomeUsuario, "UQ__USUARIO__8C9D1DE5C197256B")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__USUARIO__AB6E6164A2D9D2A8")
                    .IsUnique();

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.IdTipoUsuario).HasColumnName("idTipoUsuario");

                entity.Property(e => e.NomeUsuario)
                    .IsRequired()
                    .HasMaxLength(90)
                    .IsUnicode(false)
                    .HasColumnName("nomeUsuario");

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("senha");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__USUARIO__idTipoU__286302EC");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
