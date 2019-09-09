package lk.ucsc.projects.explore.service;

import lk.dimuthu.spring.nibm.domain.Appointment;

import java.util.Map;

/**
 * <p>AppointmentService interface.</p>
 *
 * @author Toan Quach
 * @version $Id: $Id
 */
public interface AppointmentService {

	/**
	 * <p>getAllSpecialization.</p>
	 *
	 * @return a {@link Map} object.
	 */
	Map<String, String> getAllSpecialization();

	/**
	 * <p>saveAppointment.</p>
	 *
	 * @param appointment a {@link Appointment} object.
	 */
	void saveAppointment(Appointment appointment);

	/**
	 * <p>rescheduleAppointment.</p>
	 *
	 * @param appointment a {@link Appointment} object.
	 */
	void rescheduleAppointment(Appointment appointment);

	/**
	 * Get appointment information by appointment id
	 *
	 * @param id
	 *            the id to be found
	 * @return {@link Appointment}
	 */
	Appointment getAppointment(Integer id);

	/**
	 * <p>cancelAppointment.</p>
	 *
	 * @param id a {@link Integer} object.
	 */
	void cancelAppointment(Integer id);

	/**
	 * <p>acceptAppointment.</p>
	 *
	 * @param id a {@link Integer} object.
	 */
	void acceptAppointment(Integer id);

	/**
	 * <p>rejectAppointment.</p>
	 *
	 * @param id a {@link Integer} object.
	 */
	void rejectAppointment(Integer id);

	/**
	 * <p>updateAppointment.</p>
	 *
	 * @param appointment a {@link Appointment} object.
	 */
	void updateAppointment(Appointment appointment);
}
