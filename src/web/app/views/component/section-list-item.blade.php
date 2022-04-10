@php
    $title = $item['lang'][$language['current']]['title'] ?? $item['name'];
    $description = $item['lang'][$language['current']]['description'];
    $m = $model ?? $item['model'];
    switch ($context) {
        case 'category':
            $path = '/' . $pageName . '/detail/' . $item['name'];
            break;

        case 'search':
        default:
            if ($m == 'pages') {
                $path = '/' . $item['name'];
            } else {
                $path = '/detail/' . $m . '/' . $item['name'];
            }
            break;
    }
    if ($language['url_param']) $path .= '?' . $language['url_param'];
@endphp
<article
    class="section-list-item section-list-item--{{$m}}"
    data-item-id="{{$item['id']}}"
    data-item-model="{{$m}}"
    data-item-context="{{$context}}"
>
    <h3 class="title title--item">
        <a
            href="{{$path}}"
        >
            {{$title}}
        </a>
    </h3>
    @if($description)
        <p>
            {{$description}}
        </p>
    @endif
    <a
        href="{{$path}}"
        class="btn btn-outline-primary"
    >
        {{$t('common:btn.detail')}}
    </a>
</article>