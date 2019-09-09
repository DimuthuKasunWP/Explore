package lk.ucsc.projects.explore.repository;

import lk.dimuthu.spring.nibm.domain.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * <p>AppointmentRepository interface.</p>
 *
 * @author Toan Quach
 * @version $Id: $Id
 */

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {

}
