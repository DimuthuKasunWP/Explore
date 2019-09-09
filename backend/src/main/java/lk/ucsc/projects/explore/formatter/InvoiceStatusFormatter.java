package lk.ucsc.projects.explore.formatter;

import lk.dimuthu.spring.nibm.domain.InvoiceStatus;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

/**
 * {@link InvoiceStatus} formatter for web application, this allow us to use
 * {@link InvoiceStatus} enumeration as a property in our model.
 *
 * @see InvoiceStatus
 * @author Toan Quach
 * @version $Id: $Id
 */
public class InvoiceStatusFormatter implements Formatter<InvoiceStatus> {

	/** {@inheritDoc} */
	@Override
	public String print(InvoiceStatus invoiceStatus, Locale locale) {
		return invoiceStatus.name();
	}

	/** {@inheritDoc} */
	@Override
	public InvoiceStatus parse(String text, Locale locale) throws ParseException {
		return InvoiceStatus.valueOf(text);
	}
}
