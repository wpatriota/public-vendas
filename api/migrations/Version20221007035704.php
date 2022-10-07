<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221007035704 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE installments_donation ADD donation_id INT NOT NULL');
        $this->addSql('ALTER TABLE installments_donation ADD CONSTRAINT FK_997B30494DC1279C FOREIGN KEY (donation_id) REFERENCES donation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_997B30494DC1279C ON installments_donation (donation_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE installments_donation DROP CONSTRAINT FK_997B30494DC1279C');
        $this->addSql('DROP INDEX IDX_997B30494DC1279C');
        $this->addSql('ALTER TABLE installments_donation DROP donation_id');
    }
}
