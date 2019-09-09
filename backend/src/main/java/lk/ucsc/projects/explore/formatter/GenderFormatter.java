package lk.ucsc.projects.explore.formatter;

import lk.dimuthu.spring.nibm.domain.Gender;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

/**
 * {@link Gender} formatter for web application, this allow us to use Gender
 * enumeration as a property in our model.
 *
 * @see Gender
 * @author Toan Quach
 * @version $Id: $Id
 */
public class GenderFormatter implements Formatter<Gender> {

	/** {@inheritDoc} */
	@Override
	public String print(Gender gender, Locale locale) {
		return gender.name();
	}

	/** {@inheritDoc} */
	@Override
	public Gender parse(String text, Locale locale) throws ParseException {
		return Gender.valueOf(text);
	}
}
