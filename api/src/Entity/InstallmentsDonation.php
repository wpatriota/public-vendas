<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InstallmentsDonationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: InstallmentsDonationRepository::class)]
#[ApiResource]
class InstallmentsDonation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $amount = null;

    #[ORM\Column(length: 255)]
    private ?string $paymethod = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    /**
     * Doação.
     */
    #[ORM\ManyToOne(targetEntity: Donation::class, inversedBy: 'installmentsDonation')]
    #[ORM\JoinColumn(nullable: false)]       
    #[Assert\NotNull]    
    private ?Donation $donation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getPaymethod(): ?string
    {
        return $this->paymethod;
    }

    public function setPaymethod(string $paymethod): self
    {
        $this->paymethod = $paymethod;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Doação.
     */
    public function setDonation(?Donation $donation, bool $updateRelation = true): void
    {
        $this->donation = $donation;
        if (!$updateRelation) {
            return;
        }

        if (null === $donation) {
            return;
        }

        $donation->addInstallmentsDonation($this, false);
    }

    public function getDonation(): ?Donor
    {
        return $this->donation;
    }

}
