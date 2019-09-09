package lk.ucsc.projects.explore.validator;

import lk.dimuthu.spring.nibm.domain.Patient;
import lk.dimuthu.spring.nibm.domain.User;
import lk.dimuthu.spring.nibm.util.FamilyDoctorConstants;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * This class is to handle the cross field validation for password and confirm
 * password of {@link User}
 *
 * @see {@link User}
 * @author Toan Quach
 * @version $Id: $Id
 */
public class PasswordValidator implements Validator {

	/** {@inheritDoc} */
	@Override
	public boolean supports(Class<?> clazz) {
		return Patient.class.isAssignableFrom(clazz);
	}

	/** {@inheritDoc} */
	@Override
	public void validate(Object target, Errors errors) {
		Patient patient = (Patient) target;
		if (!patient.getUser().getPassword().equals(patient.getUser().getConfirmPassword())) {
			errors.rejectValue("user.password", FamilyDoctorConstants.PASSWORD_NOTMATCH_VALIDATION);
		}
	}
}
