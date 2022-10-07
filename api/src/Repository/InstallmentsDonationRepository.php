<?php

namespace App\Repository;

use App\Entity\InstallmentsDonation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<InstallmentsDonation>
 *
 * @method InstallmentsDonation|null find($id, $lockMode = null, $lockVersion = null)
 * @method InstallmentsDonation|null findOneBy(array $criteria, array $orderBy = null)
 * @method InstallmentsDonation[]    findAll()
 * @method InstallmentsDonation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InstallmentsDonationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InstallmentsDonation::class);
    }

    public function save(InstallmentsDonation $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(InstallmentsDonation $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return InstallmentsDonation[] Returns an array of InstallmentsDonation objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?InstallmentsDonation
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
