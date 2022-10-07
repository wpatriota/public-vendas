<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DonationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: DonationRepository::class)]
#[ApiResource]
class Donation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $amount = null;

    #[ORM\Column(length: 255)]
    private ?string $paymethod = null;

    /**
     * The item that is being reviewed/rated.
     */
    #[ORM\ManyToOne(targetEntity: Donor::class, inversedBy: 'donations')]
    #[ORM\JoinColumn(nullable: false)]       
    #[Assert\NotNull]    
    private ?Donor $donor = null;

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

    public function setDonor(?Donor $donor, bool $updateRelation = true): void
    {
        $this->donor = $donor;
        if (!$updateRelation) {
            return;
        }

        if (null === $donor) {
            return;
        }

        $donor->addDonation($this, false);
    }

    public function getDonor(): ?Donor
    {
        return $this->donor;
    }
}
