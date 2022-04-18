@if($member['actions']['comments_view'] && ($detail['detail'] && $category_context['path_prefix']))
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
            creatable="{{$member['actions']['comments_create'] == 'true'}}"
        >
            Loading
        </comments>
    </section>
@endif
