{{--
Detail pagination
--}}
@if(isset($category_context['index']) && $category_context['index'] > -1)
    <div class="shared-detail pagination">
        <div
                class="hstack gap-2"
        >
            <div>
                <a
                        href="{{$category_context['path_prefix']}}"
                        class="ui-btn secondary outline"
                >
                    {{$t('common:btn.return')}}
                </a>
            </div>
            <div
                    class="hstack gap-2"
            >
                @if(isset($category_context['prev']['id']) && $category_context['prev']['id'])
                    <a
                            href="{{$languageLink($category_context['path_prefix'] . '/detail/' . $category_context['prev']['name'])}}"
                            title="{{$category_context['prev']['name']}}"
                            aria-label="{{$category_context['prev']['name']}}"
                            class="ui-btn secondary outline"
                    >
                        {{$t('common:btn.previous')}}
                    </a>
                @endif
                <span>
                    {{$category_context['index'] + 1}}/{{$category_context['count']}}
                </span>
                @if(isset($category_context['next']['id']) && $category_context['next']['id'])
                    <a
                            href="{{$languageLink($category_context['path_prefix'] . '/detail/' . $category_context['next']['name'])}}"
                            title="{{$category_context['next']['name']}}"
                            aria-label="{{$category_context['next']['name']}}"
                            class="ui-btn secondary outline"
                    >
                        {{$t('common:btn.next')}}
                    </a>
                @endif
            </div>
        </div>
    </div>
@endif