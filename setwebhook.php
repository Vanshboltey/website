<?php
$config = include('config.php');
$botToken = $config['6786898794:AAGUoU3FxGMxOIaJ8zJ5kDPd3svT42HarF8'];
$webhookUrl = 'https://vanshnetwork.co/bot.php';

$response = file_get_contents("https://api.telegram.org/bot{$botToken}/setWebhook?url={$webhookUrl}");

echo $response;