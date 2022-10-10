<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221010012230 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE customer_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE product_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE sale_order_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE customer (id INT NOT NULL, name VARCHAR(255) NOT NULL, cpf VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, birthdate DATE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE product (id INT NOT NULL, name VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE sale_order (id INT NOT NULL, customer_id INT DEFAULT NULL, amount DOUBLE PRECISION NOT NULL, datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_25F5CB1B9395C3F3 ON sale_order (customer_id)');
        $this->addSql('CREATE TABLE sale_order_product (sale_order_id INT NOT NULL, product_id INT NOT NULL, PRIMARY KEY(sale_order_id, product_id))');
        $this->addSql('CREATE INDEX IDX_4B72B0293EB8192 ON sale_order_product (sale_order_id)');
        $this->addSql('CREATE INDEX IDX_4B72B024584665A ON sale_order_product (product_id)');
        $this->addSql('ALTER TABLE sale_order ADD CONSTRAINT FK_25F5CB1B9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE sale_order_product ADD CONSTRAINT FK_4B72B0293EB8192 FOREIGN KEY (sale_order_id) REFERENCES sale_order (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE sale_order_product ADD CONSTRAINT FK_4B72B024584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE customer_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE product_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE sale_order_id_seq CASCADE');
        $this->addSql('ALTER TABLE sale_order DROP CONSTRAINT FK_25F5CB1B9395C3F3');
        $this->addSql('ALTER TABLE sale_order_product DROP CONSTRAINT FK_4B72B0293EB8192');
        $this->addSql('ALTER TABLE sale_order_product DROP CONSTRAINT FK_4B72B024584665A');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE sale_order');
        $this->addSql('DROP TABLE sale_order_product');
    }
}
