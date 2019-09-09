package lk.ucsc.projects.explore.formatter;

import lk.dimuthu.spring.nibm.domain.AppointmentStatus;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

/**
 * {@link AppointmentStatus} formatter for web application, this allow us to use
 * {@link AppointmentStatus} enumeration as a property in our model.
 *
 * @see AppointmentStatus
 * @author Toan Quach
 * @version $Id: $Id
 */
public class AppointmentStatusFormatter implements Formatter<AppointmentStatus> {

	/** {@inheritDoc} */
	@Override
	public String print(AppointmentStatus appointmentStatus, Locale locale) {
		return appointmentStatus.name();
	}

	/** {@inheritDoc} */
	@Override
	public AppointmentStatus parse(String text, Locale locale) throws ParseException {
		return AppointmentStatus.valueOf(text);
	}
}
