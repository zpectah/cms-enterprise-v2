@php
    $sectionTitle = $item['lang'][$language['current']]['title'] ?? $item['name'];
    $sectionDescription = $item['lang'][$language['current']]['description'];
    $model = $model ?? $item['model'];
    switch ($context) {
        case 'category':
            $path = '/' . $pageName . '/detail/' . $item['name'];
            break;

        case 'search':
        default:
            if ($model == 'pages') {
                $path = '/' . $item['name'];
            } else {
                $path = '/detail/' . $model . '/' . $item['name'];
            }
            break;
    }
@endphp
<article
    class="section-list-item section-list-item--{{$model}}"
    data-item-id="{{$item['id']}}"
    data-item-model="{{$model}}"
    data-item-context="{{$context}}"
>
    @if($model == 'posts' && $item['img_thumbnail'])
        <div
            class="section-list-item-image"
        >
            <img
                src="{{$uploadPath($item['img_thumbnail'])}}"
                alt="{{$item['name']}}"
            />
        </div>
    @endif
    <div
        class="section-list-item-content"
    >
        <h3 class="title title--item">
            <a
                href="{{$languageLink($path)}}"
            >
                {{$sectionTitle}}
            </a>
        </h3>
        @if($sectionDescription)
            <p>
                {{$sectionDescription}}
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