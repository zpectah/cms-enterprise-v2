{{--
Search form

* $formId

--}}
@php
    $formId = $formId ?? 'FormSearch';
@endphp
<form
        name="{{$formId}}"
        id="{{$formId}}"
        method="get"
        action="{{$public['links']['action_search']}}"
        class="row g-3"
>
    <div class="col-auto">
        <label
                for="{{$formId}}_search"
                class="visually-hidden"
        >
            {{$t('form:label.search')}}
        </label>
        <input
                type="search"
                name="search"
                class="form-control"
                id="{{$formId}}_search"
                placeholder="{{$t('form:placeholder.search')}}"
        >
    </div>
    <div class="col-auto">
        <button
                type="submit"
                class="btn btn-outline-primary mb-3"
        >
            {{$t('form:submit.search')}}
        </button>
    </div>
</form>