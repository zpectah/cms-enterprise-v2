{{--
Subscription form

* $formId

--}}
@php
    $formId = $formId ?? 'FormSubscription';
@endphp
<member-subscription-form
        form-id="{{$formId}}"
>
    Loading
</member-subscription-form>