<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221010012440 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE donor_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE donation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE installments_donation_id_seq CASCADE');
        $this->addSql('ALTER TABLE installments_donation DROP CONSTRAINT fk_997b30494dc1279c');
        $this->addSql('ALTER TABLE donation DROP CONSTRAINT fk_31e581a03dd7b7a7');
        $this->addSql('DROP TABLE installments_donation');
        $this->addSql('DROP TABLE donor');
        $this->addSql('DROP TABLE donation');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE donor_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE donation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE installments_donation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE installments_donation (id INT NOT NULL, donation_id INT NOT NULL, amount DOUBLE PRECISION NOT NULL, paymethod VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_997b30494dc1279c ON installments_donation (donation_id)');
        $this->addSql('CREATE TABLE donor (id INT NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE donation (id INT NOT NULL, donor_id INT NOT NULL, amount DOUBLE PRECISION NOT NULL, paymethod VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_31e581a03dd7b7a7 ON donation (donor_id)');
        $this->addSql('ALTER TABLE installments_donation ADD CONSTRAINT fk_997b30494dc1279c FOREIGN KEY (donation_id) REFERENCES donation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE donation ADD CONSTRAINT fk_31e581a03dd7b7a7 FOREIGN KEY (donor_id) REFERENCES donor (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
