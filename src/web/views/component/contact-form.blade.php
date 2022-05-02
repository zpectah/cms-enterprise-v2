{{--
contact form

* $formId

--}}
@php
    $formId = $formId ?? 'FormContact';
    $memberEmail = isset($member['profile']['email']) ?? $member['profile']['email'];
@endphp
<contact-form
        form-id="{{$formId}}"
        email="{{$memberEmail}}"
>
    Loading
</contact-form>