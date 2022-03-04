USE carometro
GO

INSERT INTO TIPOUSUARIO (nomeTipoUsuario)
VALUES ('Administrador'),('Colaboradores');
GO

INSERT INTO USUARIO (idTipoUsuario,nomeUsuario,email,senha)
VALUES 
(2,'Pedro Paulo','pedro@email.com','pedro123'),
(2,'Gustavo Miguel','gustavo@email.com', 'gustavo'),
(2,'Ana Luiza','ana@email.com', 'ana123'),
(1,'Administrador','adm@gmail.com','	');
GO

INSERT INTO TURMA (descricaoTurma)
VALUES 
('1RM'),
('2RM'),
('1DT'),
('2DT');
GO

INSERT INTO ALUNO (idTurma,nomeAluno,RM,dataNascimento,CPF,telefoneCel,telefoneFixo,emailAluno,emailResponsavel,URLimg)
VALUES 
(1,'Carlos','12345','14-03-2003','100.000.001-12','11888888888','1124536677','carlos@email.com','maria@email.com', '123456789'),
(2,'Camila','23456','17-03-2003','100.230.001-12','11777888888','1124512377','camila@email.com','marialurdes@email.com', '123456xc789'),
(3,'Paulo','89012','19-06-2003','410.230.001-12','11775467888','1124513471','paulo@email.com','nilda@email.com', '123456xc7ascsa89'),
(4,'Priscila','12356','28-02-2003','124.230.001-12','11777190888','1149512377','priscila@email.com','priscila@email.com', '123456ddsxxc789');
GO

INSERT INTO COMENTARIO(idAluno, descricao)
VALUES 
(1,'Sem Comentarios'),
(2,'Suspensao de 10 dias'),
(3,'Sem Comentarios'),
(4,'Aluno Destaque do Mes');
GO