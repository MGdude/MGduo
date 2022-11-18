package com.Music.Group.Validation;

import javax.validation.GroupSequence;
import javax.validation.groups.Default;

@GroupSequence({ValidationGroup.NotBlankGroup.class,
                ValidationGroup.SizedGroup.class,
                ValidationGroup.PatternCheckGroup.class,
                Default.class
})
public interface ValidationSequence {
}
