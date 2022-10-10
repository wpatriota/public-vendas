<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?float $price = null;

    #[ORM\ManyToMany(targetEntity: SaleOrder::class, mappedBy: 'Product')]
    private Collection $saleOrders;

    public function __construct()
    {
        $this->saleOrders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, SaleOrder>
     */
    public function getSaleOrders(): Collection
    {
        return $this->saleOrders;
    }

    public function addSaleOrder(SaleOrder $saleOrder): self
    {
        if (!$this->saleOrders->contains($saleOrder)) {
            $this->saleOrders->add($saleOrder);
            $saleOrder->addProduct($this);
        }

        return $this;
    }

    public function removeSaleOrder(SaleOrder $saleOrder): self
    {
        if ($this->saleOrders->removeElement($saleOrder)) {
            $saleOrder->removeProduct($this);
        }

        return $this;
    }
}
