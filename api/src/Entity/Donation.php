<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DonationRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Serializer\Filter\PropertyFilter;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: DonationRepository::class)]
#[ApiResource(
    //types: ['https://schema.org/DonateAction'],    
    mercure: true,
    paginationClientItemsPerPage: true,
    //routePrefix: '/api'
)]
#[GetCollection]
#[Post]
#[Get]
#[Put]
#[Patch]
#[Delete]
#[Put(    
    output: false,
    messenger: true,
)]

class Donation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    //#[ApiProperty(types: ['https://schema.org/price'])]
    private ?float $amount = null;

    #[ORM\Column(length: 255)]
    private ?string $paymethod = null;

    /**
     * Doador.
     */
    #[ORM\ManyToOne(targetEntity: Donor::class, inversedBy: 'donations')]
    #[ORM\JoinColumn(nullable: false)]       
    #[Assert\NotNull]    
    //#[ApiProperty(types: ['https://schema.org/agent'])]
    private ?Donor $donor = null;

    /**
     * Parcelas.
     */
    #[ORM\OneToMany(mappedBy: 'donation', targetEntity: InstallmentsDonation::class, cascade: ['persist', 'remove'], orphanRemoval: true)]    
    private Collection $installmentsDonations;

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

    /**
     * Doador.
     */
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

    /**
     * Parcelas.
     */
    public function addInstallmentsDonation(InstallmentsDonation $installmentsDonation, bool $updateRelation = true): void
    {
        if ($this->donations->contains($installmentsDonation)) {
            return;
        }

        $this->donations->add($installmentsDonation);
        if ($updateRelation) {
            $installmentsDonation->setDonation($this, false);
        }
    }

    public function removeInstallmentsDonation(InstallmentsDonation $installmentsDonation, bool $updateRelation = true): void
    {
        $this->installmentsDonation->removeElement($installmentsDonation);
        if ($updateRelation) {
            $installmentsDonation->setDonation(null, false);
        }
    }

    /**
     * @return Collection<int, InstallmentsDonation>
     */
    public function getInstallmentsDonations(): iterable
    {
        return $this->installmentsDonations;
    }
}
