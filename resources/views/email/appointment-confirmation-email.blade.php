<h1>Confirm your appointment</h1>
<p>An appointment was recently requested by this email address.</p>
<p>Appointment details</p>
<ul>
  <li><b>Date: </b>{{ $date }}</li>
  <li><b>Category: </b>{{ $category }}</li>
</ul>
<p>Please, confirm your appointment by clicking <a href="{{ $urlConfirmAppointment }}" target="_blank">{{ $urlConfirmAppointment }}</a> link</p>
<p>If you didn't requested the appointment or you don't need it, cancel it by clicking <a href="{{ $urlCancelAppointment }}" target="_blank">{{ $urlCancelAppointment }}</a> link</p>
<p>Best regards,</p>