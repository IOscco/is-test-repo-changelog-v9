import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'ventas', name: 'cliente', synchronize: false })
export class CustomerModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    nombre_completo: string;

    @Column({ type: 'varchar', length: 254, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    segmento: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    activo: boolean;
}
