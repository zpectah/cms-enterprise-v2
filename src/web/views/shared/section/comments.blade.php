{{--
Section comments
--}}
@php
    $memberEmail = isset($member['profile']['email']) ?? $member['profile']['email'];
@endphp
@if($member['actions']['comments_view'] && (isset($detail['detail']) && isset($category_context['path_prefix'])))
    <section class="section section--comments">
        @include('shared.section.section-title', [ 'title' => $t('common:label.comments') ])
        <comments
                assigned="{{$assigned}}"
                assigned-id="{{$assignedId}}"
                email="{{$memberEmail}}"
                anonymous="{{$public['comments_anonymous_active'] == 1 || $memberEmail}}"
                creatable="{{$member['actions']['comments_create'] == 'true'}}"
        >
            Loading
        </comments>
    </section>
@endif