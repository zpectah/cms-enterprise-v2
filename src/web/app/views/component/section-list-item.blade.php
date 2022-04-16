@php
    $title = $item['lang'][$language['current']]['title'] ?? $item['name'];
    $description = $item['lang'][$language['current']]['description'];
    $model = $model ?? $item['model'];
    switch ($context) {
        case 'category':
            $path = '/' . $pageName . '/detail/' . $item['name'];
            break;

        case 'search':
        default:
            if ($m == 'pages') {
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
    <h3 class="title title--item">
        <a
            href="{{$languageLink($path)}}"
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
        href="{{$languageLink($path)}}"
        class="btn btn-outline-primary"
    >
        {{$t('common:btn.detail')}}
    </a>
</article>