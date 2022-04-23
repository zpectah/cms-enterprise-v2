{{--
Article list: displays list of posts/articles

* $articleItem

--}}
@php
    $articleTitle = $articleItem['lang'][$language['current']]['title'] ?? $articleItem['name'];
    $articleDescription = $articleItem['lang'][$language['current']]['description'];
    $model = $model ?? $articleItem['model'];
    switch ($context) {
        case 'category':
            $path = '/' . $pageName . '/detail/' . $articleItem['name'];
            break;

        case 'search':
        default:
            if ($model == 'pages') {
                $path = '/' . $articleItem['name'];
            } else {
                $path = '/detail/' . $model . '/' . $articleItem['name'];
            }
            break;
    }
@endphp
<article
        class="component article-list-item item--{{$context}}-{{$model}}"
        id="{{$context}}_{{$model}}_{{$articleItem['id']}}"
        data-item-id="{{$articleItem['id']}}"
        data-item-model="{{$model}}"
        data-item-context="{{$context}}"
>
    @if($model == 'posts' && $articleItem['img_thumbnail'])
        <div
                class="article-list-item-image"
        >
            <img
                    src="{{$uploadPath($articleItem['img_thumbnail'])}}"
                    alt="{{$articleItem['name']}}"
            />
        </div>
    @endif
    <div
            class="article-list-item-content"
    >
        <h3 class="title title--item">
            <a
                    href="{{$languageLink($path)}}"
            >
                {{$articleTitle}}
            </a>
        </h3>
        @if($articleDescription)
            <p>
                {{$articleDescription}}
            </p>
        @endif
        <a
                href="{{$languageLink($path)}}"
                class="btn btn-outline-primary"
        >
            {{$t('common:btn.detail')}}
        </a>
    </div>
</article>