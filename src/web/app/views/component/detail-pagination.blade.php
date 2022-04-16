@if($category_context['index'] > -1)
    <section class="section section--pagination">
        <div
            class="pagination pagination--detail"
        >
            @if($category_context['prev']['id'])
                <a
                    href="{{$languageLink($category_context['path_prefix'] . $category_context['prev']['name'])}}"
                    title="{{$category_context['prev']['name']}}"
                    aria-label="{{$category_context['prev']['name']}}"
                    class="btn btn-outline-secondary btn-sm"
                >
                    {{$t('common:btn.previous')}}
                </a>
            @endif
            <span>
                {{$category_context['index'] + 1}}/{{$category_context['count']}}
            </span>
            @if($category_context['next']['id'])
                <a
                    href="{{$languageLink($category_context['path_prefix'] . $category_context['next']['name'])}}"
                    title="{{$category_context['next']['name']}}"
                    aria-label="{{$category_context['next']['name']}}"
                    class="btn btn-outline-secondary btn-sm"
                >
                    {{$t('common:btn.next')}}
                </a>
            @endif
        </div>
    </section>
@endif
