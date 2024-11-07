<?php

namespace App;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
enum FlashNotificationType:string
{
    case Success = 'success';
    case Error = 'error';
    case Info = 'info';
    case Warning = 'warning';
}
