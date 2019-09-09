package lk.ucsc.projects.explore.formatter;

import lk.dimuthu.spring.nibm.domain.Specialization;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

/**
 * {@link Specialization} formatter for web application, this allow us to use
 * {@link Specialization} enumeration as a property in our model.
 *
 * @see Specialization
 * @author Toan Quach
 * @version $Id: $Id
 */
public class SpecializationFormatter implements Formatter<Specialization> {

	/** {@inheritDoc} */
	@Override
	public String print(Specialization specialization, Locale locale) {
		return specialization.name();
	}

	/** {@inheritDoc} */
	@Override
	public Specialization parse(String text, Locale locale) throws ParseException {
		return Specialization.valueOf(text);
	}
}
