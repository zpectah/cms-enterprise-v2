@if($public['comments_global_active'])
    <section
        class="section section--comments"
    >
        <h3
            class="title title--section"
        >
            {{$t('common:label.comments')}}
        </h3>
        <comments
            assigned="{{$assigned}}"
            assigned-id="{{$assignedId}}"
            email="{{$member['profile']['email']}}"
            anonymous="{{$public['comments_anonymous_active'] == 1 || $member['profile']['email']}}"
        >
            Loading
        </comments>
    </section>
@endif
