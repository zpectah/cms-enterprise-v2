<section
    class="section section--author"
>
    <dl>
        <dt>{{$t('common:label.email')}}</dt>
        <dd>{{$detail['detail']['__author']['email']}}</dd>
    </dl>
    <dl>
        <dt>{{$t('common:label.nickname')}}</dt>
        <dd>{{$detail['detail']['__author']['nickname']}}</dd>
    </dl>
    @if($detail['detail']['__author']['description'])
        <dl>
            <dt>{{$t('common:label.description')}}</dt>
            <dd>{{$detail['detail']['__author']['description']}}</dd>
        </dl>
    @endif
</section>