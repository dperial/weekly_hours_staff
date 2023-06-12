
/* const birthday_date = document.getElementById('birthday_date');
birthday_date.datepicker({
    format: 'yyyy-mm-dd'
 });
$(function () {
    $('#birthday_date').datepicker({
        format: 'yyyy--mm--dd'
    });
}); */
$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
            last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            birthday_date: {
                validators: {   
                    notEmpty: {
                        message: 'Please supply your birthday date'
                    },
                    date: {
                        format: 'YYYY-MM-DD',
                        message: 'Please supply a valid birthday date'
                    }
                }
            },
            birthday_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your birthday name'
                    }
                }
            },
            birthday_place: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your brithday place'
                    }
                }
            },
            gender: {
                validators: {
                  choice: {
                    min: 1,
                    message: 'Please select your gender'
                  }
                }
            },
            start_date: {
               validators: {
                   notEmpty: {
                       message: 'Please supply your start date'
                   },
                   date: {
                       format: 'YYYY-MM-DD',
                       message: 'Please supply a valid start date'
                   }
                }
            },
            end_date: {
               /* validators: {
                   notEmpty: {
                       message: 'Please supply your end date'
                   },
                   date: {
                       format: 'YYYY-MM-DD',
                       message: 'Please supply a valid end date'
                   }
                } */
            },
            insert_date: {
               validators: {
                   notEmpty: {
                       message: 'Please supply your birthday date'
                   },
                   date: {
                       format: 'YYYY-MM-DD',
                       message: 'Please supply a valid birthday date'
                   }
                }
            },
            update_date: {
               validators: {
                   notEmpty: {
                       message: 'Please supply your update date'
                   },
                   date: {
                       format: 'YYYY-MM-DD',
                       message: 'Please supply a valid update date'
                   }
                }
            },
            steuer_id: {},        
            insert_by: {
                excluded: false,
                /* validators: {
                  notEmpty: {
                    message: 'Please enter your first name'
                  }
                } */
            },
            end_reason: {
                validators: {
                     stringLength: {
                        min: 5,
                    },
                    notEmpty: {
                        message: 'Please supply the end reason'
                    }
                }
            },
            weekly_hours: {
                validators: {
                  notEmpty: {
                    message: 'Weekly hours is required'
                  },
                  numeric: {
                    message: 'Weekly hours must be a valid number'
                  }
                }
            },
        }
    })    
    .on('success.form.bv', function(e) {
        $('#success_message').slideDown({ opacity: "show" }, "slow");
        $('#contact_form').data('bootstrapValidator').resetForm();
    
        e.preventDefault();
        var $form = $(e.target);
    
        /* $.post($form.attr('action'), $form.serialize(), function(result) {
            console.log(result);
    
            if (result.success) {
                // Redirect to the new staff member's details page
                window.location.replace('http://127.0.0.1:5500/views/index.html');
            } else {
                // Show an error message
                $('#error_message').text('Failed to create staff member').show();
            }
        }, 'json'); */
        $.ajax({
            url: $form.attr('action'),
            type: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            contenType: 'application/json',
            success: function(response) {
              if (response.success) {
                var staffId = response.staffId;
                // Do something with the staffId, such as redirecting to staff details page
                // window.location.href = 'staff_details.php?id=' + staffId;
                window.location.replace('http://127.0.0.1:5500/views/index.html');
              } else {
                // Show an error message or perform any other error handling
                console.log('Staff member creation failed.');
              }
            },
            error: function(xhr, status, error) {
              // Show an error message or perform any other error handling
              console.log('An error occurred during staff member creation.');
            }
          });
    });
     
    // Submission handler
    // New code to handle the form submission
    /* $('#contact_form').on('submit', function(e) {
        e.preventDefault();
        window.location.href = '../api/staff/create.php?' + $(this).serialize();
    }); */
    // Old code to handle the form submission
    /* $('#contact_form').on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();
      
        // Get the form instance
        var $form = $(e.target);
      
        // Use Ajax to submit form data
        $.ajax({
          url: $form.attr('action'),
          type: 'POST',
          data: $form.serialize(),
          dataType: 'json',
          contenType: 'application/json',
          success: function(response) {
            if (response.success) {
              var staffId = response.staffId;
              // Do something with the staffId, such as redirecting to staff details page
              // window.location.href = 'staff_details.php?id=' + staffId;
              window.location.replace('http://127.0.0.1:5500/views/index.html');
            } else {
              // Show an error message or perform any other error handling
              console.log('Staff member creation failed.');
            }
          },
          error: function(xhr, status, error) {
            // Show an error message or perform any other error handling
            console.log('An error occurred during staff member creation.');
          }
        });
      }); */
      
});

