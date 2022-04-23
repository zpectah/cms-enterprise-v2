{{--
contact form

* $formId

--}}
@php
    $formId = $formId ?? 'FormContact';
@endphp
<contact-form
        form-id="{{$formId}}"
        email="{{$member['profile']['email']}}"
>
    Loading
</contact-form>